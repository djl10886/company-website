import assert from 'node:assert/strict';
import { test } from 'node:test';

import { handleRequest } from '../src/worker.mjs';

const ORIGIN = 'https://clankrintelligence.com';
const TEST_ID = 'realisticnpcs-local-unreal-v0.4.0-windows-x86_64-system-test';
const LICENSE_SHA =
  '2b514ea59e74f917fda45607f91b755399f2b7f286b9a6b37e259782391b9dd1';
const TEST_TEXT = 'x'.repeat(226);
const MAX_FORM_BYTES = 4096;

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

function streamedPost(chunks, headers = {}) {
  const encodedChunks = chunks.map((chunk) =>
    typeof chunk === 'string' ? new TextEncoder().encode(chunk) : chunk,
  );
  let chunkIndex = 0;
  let cancelled = false;
  const body = new ReadableStream({
    pull(controller) {
      if (chunkIndex === encodedChunks.length) {
        controller.close();
        return;
      }
      controller.enqueue(encodedChunks[chunkIndex]);
      chunkIndex += 1;
    },
    cancel() {
      cancelled = true;
    },
  });
  return {
    request: new Request('https://downloads.clankrintelligence.com/download', {
      method: 'POST',
      headers: {
        Origin: ORIGIN,
        'Content-Type': 'application/x-www-form-urlencoded',
        ...headers,
      },
      body,
      duplex: 'half',
    }),
    wasCancelled() {
      return cancelled;
    },
  };
}

function encodedForm(fields = {}) {
  return new URLSearchParams({
    acceptance: 'accepted',
    artifact_id: TEST_ID,
    license_sha256: LICENSE_SHA,
    ...fields,
  }).toString();
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

test('enforces the form limit while streaming request bodies', async () => {
  const validBody = encodedForm();
  const streamedValid = streamedPost([
    validBody.slice(0, 17),
    validBody.slice(17, 83),
    validBody.slice(83),
  ]);
  assert.equal(streamedValid.request.headers.get('Content-Length'), null);
  const validResponse = await handleRequest(
    streamedValid.request,
    envWith(objectFor(), 'realisticnpcs-download-test.txt'),
  );
  assert.equal(validResponse.status, 200);
  assert.equal(streamedValid.wasCancelled(), false);

  const fixedFormBytes = new TextEncoder().encode(
    `acceptance=accepted&artifact_id=&license_sha256=${LICENSE_SHA}`,
  ).byteLength;
  const boundaryBody = encodedForm({
    artifact_id: 'a'.repeat(MAX_FORM_BYTES - fixedFormBytes),
  });
  assert.equal(new TextEncoder().encode(boundaryBody).byteLength, MAX_FORM_BYTES);
  const boundary = streamedPost([boundaryBody.slice(0, 2048), boundaryBody.slice(2048)]);
  assert.equal((await handleRequest(boundary.request, envWith(null))).status, 404);
  assert.equal(boundary.wasCancelled(), false);

  const oversized = streamedPost(
    ['a'.repeat(2048), 'b'.repeat(2048), 'c'],
    { 'Content-Length': '1' },
  );
  assert.equal((await handleRequest(oversized.request, envWith(null))).status, 413);
  assert.equal(oversized.wasCancelled(), true);

  const declaredOversized = post({}, {
    'Content-Length': String(MAX_FORM_BYTES + 1),
  });
  assert.equal(
    (await handleRequest(declaredOversized, envWith(null))).status,
    413,
  );
});

test('rejects request stream failures as malformed acceptance', async () => {
  const body = new ReadableStream({
    pull(controller) {
      controller.error(new Error('request stream failed'));
    },
  });
  const request = new Request('https://downloads.clankrintelligence.com/download', {
    method: 'POST',
    headers: {
      Origin: ORIGIN,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    duplex: 'half',
  });
  assert.equal((await handleRequest(request, envWith(null))).status, 400);
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
  const releases = Object.freeze({
    [artifactId]: Object.freeze({
      artifactId,
      key,
      fileName,
      contentType: 'application/zip',
      size: 3,
      artifactSha256: 'a'.repeat(64),
      licenseSha256: LICENSE_SHA,
      licenseUrl:
        'https://clankrintelligence.com/legal/realisticnpcs-local/0.4.0/LICENSE.txt',
    }),
  });
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
    releases,
  );
  assert.equal(response.status, 200);
  assert.equal(await response.text(), 'zip');
  assert.equal(response.headers.get('X-Artifact-SHA256'), null);

  assert.equal(
    (
      await handleRequest(
        post({ artifact_id: artifactId, license_sha256: 'b'.repeat(64) }),
        envWith(object),
        releases,
      )
    ).status,
    403,
  );

  object.customMetadata['license-sha256'] = 'b'.repeat(64);
  assert.equal(
    (
      await handleRequest(
        post({ artifact_id: artifactId }),
        envWith(object, key),
        releases,
      )
    ).status,
    503,
  );

  object.customMetadata['license-sha256'] = LICENSE_SHA;
  object.customMetadata.unexpected = 'value';
  assert.equal(
    (
      await handleRequest(
        post({ artifact_id: artifactId }),
        envWith(object, key),
        releases,
      )
    ).status,
    503,
  );

  delete object.customMetadata.unexpected;
  object.customMetadata['artifact-sha256'] = 'c'.repeat(64);
  assert.equal(
    (
      await handleRequest(
        post({ artifact_id: artifactId }),
        envWith(object, key),
        releases,
      )
    ).status,
    503,
  );

  object.customMetadata['artifact-sha256'] = 'a'.repeat(64);
  object.size = 4;
  assert.equal(
    (
      await handleRequest(
        post({ artifact_id: artifactId }),
        envWith(object, key),
        releases,
      )
    ).status,
    503,
  );

  assert.equal(
    (
      await handleRequest(post({ artifact_id: artifactId }), envWith(object), {
        [artifactId]: { ...releases[artifactId], size: 0 },
      })
    ).status,
    404,
  );
});
