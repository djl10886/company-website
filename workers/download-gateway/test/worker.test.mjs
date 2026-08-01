import assert from 'node:assert/strict';
import { test } from 'node:test';

import { handleRequest } from '../src/worker.mjs';

const ORIGIN = 'https://clankrintelligence.com';
const TEST_ID = 'realisticnpcs-local-unreal-v0.4.0-windows-x86_64-system-test';
const LICENSE_SHA =
  '2b514ea59e74f917fda45607f91b755399f2b7f286b9a6b37e259782391b9dd1';
const TEST_TEXT = 'x'.repeat(226);

function objectFor(body = TEST_TEXT, overrides = {}) {
  return {
    body,
    size: new TextEncoder().encode(body).byteLength,
    httpEtag: '"ee3d07b6c5ebac9e287f2232cd5fd372"',
    httpMetadata: {},
    customMetadata: {},
    ...overrides,
  };
}

function envWith(object, expectedKey) {
  return {
    RELEASE_BUCKET: {
      async get(key) {
        if (expectedKey) {
          assert.equal(key, expectedKey);
        }
        return object;
      },
    },
  };
}

function failingEnv() {
  return {
    RELEASE_BUCKET: {
      async get() {
        throw new Error('R2 unavailable');
      },
    },
  };
}

function post(fields = {}, headers = {}) {
  const body = new URLSearchParams({
    acceptance: 'accepted',
    artifact_id: TEST_ID,
    license_sha256: LICENSE_SHA,
    ...fields,
  });
  return new Request('https://downloads.clankrintelligence.com/download', {
    method: 'POST',
    headers: { Origin: ORIGIN, ...headers },
    body,
  });
}

test('rejects non-POST requests and unrelated paths', async () => {
  const env = envWith(null);
  const get = await handleRequest(
    new Request('https://downloads.clankrintelligence.com/download'),
    env,
  );
  assert.equal(get.status, 405);
  assert.equal(get.headers.get('Allow'), 'POST');

  const missing = await handleRequest(
    new Request('https://downloads.clankrintelligence.com/realisticnpcs-download-test.txt'),
    env,
  );
  assert.equal(missing.status, 404);

  assert.equal(
    (await handleRequest(post({ artifact_id: 'toString' }), env)).status,
    404,
  );

  const acceptedBody = new URLSearchParams({
    acceptance: 'accepted',
    artifact_id: TEST_ID,
    license_sha256: LICENSE_SHA,
  });
  for (const url of [
    'http://downloads.clankrintelligence.com/download',
    'https://downloads.clankrintelligence.com:444/download',
  ]) {
    const response = await handleRequest(
      new Request(url, {
        method: 'POST',
        headers: { Origin: ORIGIN },
        body: acceptedBody,
      }),
      env,
    );
    assert.equal(response.status, 404);
  }
});

test('rejects wrong origins and malformed acceptance', async () => {
  const env = envWith(objectFor());
  assert.equal(
    (await handleRequest(post({}, { Origin: 'https://example.com' }), env)).status,
    403,
  );
  assert.equal((await handleRequest(post({ acceptance: 'no' }), env)).status, 403);
  assert.equal((await handleRequest(post({ license_sha256: '0'.repeat(64) }), env)).status, 403);

  const duplicate = new URLSearchParams({
    acceptance: 'accepted',
    artifact_id: TEST_ID,
    license_sha256: LICENSE_SHA,
  });
  duplicate.append('acceptance', 'accepted');
  const duplicateResponse = await handleRequest(
    new Request('https://downloads.clankrintelligence.com/download', {
      method: 'POST',
      headers: { Origin: ORIGIN },
      body: duplicate,
    }),
    env,
  );
  assert.equal(duplicateResponse.status, 400);

  const extraField = await handleRequest(post({ unexpected: 'value' }), env);
  assert.equal(extraField.status, 400);

  const wrongMediaType = await handleRequest(
    post({}, { 'Content-Type': 'text/plain' }),
    env,
  );
  assert.equal(wrongMediaType.status, 415);

  for (const body of [
    new Uint8Array([0xff]),
    'acceptance=accepted&artifact_id=%no&license_sha256=' + LICENSE_SHA,
    'acceptance=accepted&artifact_id=%FF&license_sha256=' + LICENSE_SHA,
  ]) {
    const malformedResponse = await handleRequest(
      new Request('https://downloads.clankrintelligence.com/download', {
        method: 'POST',
        headers: {
          Origin: ORIGIN,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      }),
      env,
    );
    assert.equal(malformedResponse.status, 400);
  }
});

test('streams the exact system-test object without a persistent grant', async () => {
  const response = await handleRequest(
    post(),
    envWith(objectFor(), 'realisticnpcs-download-test.txt'),
  );
  assert.equal(response.status, 200);
  assert.equal(await response.text(), TEST_TEXT);
  assert.equal(response.headers.get('Content-Length'), '226');
  assert.equal(
    response.headers.get('Content-Disposition'),
    'attachment; filename="realisticnpcs-download-test.txt"',
  );
  assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
  assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
  assert.equal(response.headers.get('Set-Cookie'), null);
  assert.equal(response.headers.get('Location'), null);
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);

  const wrongObject = objectFor(TEST_TEXT, { httpEtag: '"changed"' });
  assert.equal(
    (await handleRequest(post(), envWith(wrongObject))).status,
    503,
  );
  assert.equal((await handleRequest(post(), failingEnv())).status, 503);
});

test('validates registered release objects', async () => {
  const artifactId = 'realisticnpcs-local-unreal-v0.4.0-windows-x86_64';
  const fileName = 'RealisticNPCs-Local-Unreal-v0.4.0-Windows-x86_64.zip';
  const key = `releases/0.4.0/unreal/windows-x86_64/${fileName}`;
  const object = objectFor('zip', {
    httpMetadata: {
      contentType: 'application/zip',
      contentDisposition: `attachment; filename="${fileName}"`,
      cacheControl: 'private, no-store',
    },
    customMetadata: {
      'delivery-contract': 'download-page-clickwrap-v1',
      'artifact-id': artifactId,
      'artifact-sha256': 'a'.repeat(64),
      'license-sha256': LICENSE_SHA,
      'license-url':
        'https://clankrintelligence.com/legal/realisticnpcs-local/0.4.0/LICENSE.txt',
    },
  });
  const response = await handleRequest(
    post({ artifact_id: artifactId }),
    envWith(object, key),
  );
  assert.equal(response.status, 200);
  assert.equal(await response.text(), 'zip');
  assert.equal(response.headers.get('X-Artifact-SHA256'), null);

  assert.equal(
    (
      await handleRequest(
        post({ artifact_id: artifactId, license_sha256: 'b'.repeat(64) }),
        envWith(object),
      )
    ).status,
    403,
  );

  object.customMetadata['license-sha256'] = 'b'.repeat(64);
  assert.equal(
    (await handleRequest(post({ artifact_id: artifactId }), envWith(object, key))).status,
    503,
  );

  object.customMetadata['license-sha256'] = LICENSE_SHA;
  object.customMetadata.unexpected = 'value';
  assert.equal(
    (await handleRequest(post({ artifact_id: artifactId }), envWith(object, key))).status,
    503,
  );
});
