const GATEWAY_ORIGIN = 'https://downloads.clankrintelligence.com';
const WEBSITE_ORIGIN = 'https://clankrintelligence.com';
const DOWNLOAD_PATH = '/download';
const DELIVERY_CONTRACT = 'download-page-clickwrap-v1';
const MAX_FORM_BYTES = 4096;
const FORM_FIELDS = ['acceptance', 'artifact_id', 'license_sha256'];
const RELEASE_METADATA_FIELDS = [
  'artifact-id',
  'artifact-sha256',
  'delivery-contract',
  'license-sha256',
  'license-url',
];
const SHA256_PATTERN = /^[0-9a-f]{64}$/;

const SYSTEM_TEST = Object.freeze({
  artifactId:
    'realisticnpcs-local-unreal-v0.4.0-windows-x86_64-system-test',
  key: 'realisticnpcs-download-test.txt',
  fileName: 'realisticnpcs-download-test.txt',
  contentType: 'text/plain; charset=utf-8',
  size: 226,
  etag: '"ee3d07b6c5ebac9e287f2232cd5fd372"',
  licenseSha256:
    '2b514ea59e74f917fda45607f91b755399f2b7f286b9a6b37e259782391b9dd1',
});

const RELEASES = Object.freeze({
  'realisticnpcs-local-unreal-v0.4.0-windows-x86_64': Object.freeze({
    artifactId: 'realisticnpcs-local-unreal-v0.4.0-windows-x86_64',
    key:
      'releases/0.4.0/unreal/windows-x86_64/' +
      'RealisticNPCs-Local-Unreal-v0.4.0-Windows-x86_64.zip',
    fileName: 'RealisticNPCs-Local-Unreal-v0.4.0-Windows-x86_64.zip',
    contentType: 'application/zip',
    licenseSha256:
      '2b514ea59e74f917fda45607f91b755399f2b7f286b9a6b37e259782391b9dd1',
    licenseUrl: `${WEBSITE_ORIGIN}/legal/realisticnpcs-local/0.4.0/LICENSE.txt`,
  }),
});

function errorResponse(status, message) {
  const headers = new Headers({
    'Cache-Control': 'private, no-store',
    'Content-Type': 'text/plain; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
  });
  if (status === 405) {
    headers.set('Allow', 'POST');
  }
  return new Response(`${message}\n`, { status, headers });
}

function getRegisteredRelease(artifactId) {
  return Object.hasOwn(RELEASES, artifactId) ? RELEASES[artifactId] : null;
}

function validateReleaseObject(object, release) {
  const metadata = object.customMetadata ?? {};
  const metadataFields = Object.keys(metadata).sort();
  return (
    object.size > 0 &&
    metadataFields.length === RELEASE_METADATA_FIELDS.length &&
    metadataFields.every(
      (field, index) => field === RELEASE_METADATA_FIELDS[index],
    ) &&
    metadata['delivery-contract'] === DELIVERY_CONTRACT &&
    metadata['artifact-id'] === release.artifactId &&
    SHA256_PATTERN.test(metadata['artifact-sha256'] ?? '') &&
    metadata['license-sha256'] === release.licenseSha256 &&
    metadata['license-url'] === release.licenseUrl &&
    object.httpMetadata?.contentType === release.contentType &&
    object.httpMetadata?.contentDisposition ===
      `attachment; filename="${release.fileName}"` &&
    object.httpMetadata?.cacheControl === 'private, no-store'
  );
}

function attachmentResponse(object, artifact) {
  const headers = new Headers({
    'Cache-Control': 'private, no-store',
    'Content-Disposition': `attachment; filename="${artifact.fileName}"`,
    'Content-Length': String(object.size),
    'Content-Type': artifact.contentType,
    'X-Content-Type-Options': 'nosniff',
  });
  if (object.httpEtag) {
    headers.set('ETag', object.httpEtag);
  }
  return new Response(object.body, { status: 200, headers });
}

async function parseForm(request) {
  const contentType = request.headers.get('Content-Type') ?? '';
  const mediaType = contentType.split(';', 1)[0].trim().toLowerCase();
  if (mediaType !== 'application/x-www-form-urlencoded') {
    return { error: errorResponse(415, 'Unsupported media type.') };
  }
  const declaredLength = Number(request.headers.get('Content-Length') ?? '0');
  if (Number.isFinite(declaredLength) && declaredLength > MAX_FORM_BYTES) {
    return { error: errorResponse(413, 'Request body is too large.') };
  }
  const bytes = new Uint8Array(await request.arrayBuffer());
  if (bytes.byteLength > MAX_FORM_BYTES) {
    return { error: errorResponse(413, 'Request body is too large.') };
  }
  let encodedForm;
  try {
    encodedForm = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return { error: errorResponse(400, 'Malformed acceptance request.') };
  }
  try {
    decodeURIComponent(encodedForm.replace(/\+/g, ' '));
  } catch {
    return { error: errorResponse(400, 'Malformed acceptance request.') };
  }
  const form = new URLSearchParams(encodedForm);
  const keys = [...form.keys()].sort();
  if (
    keys.length !== FORM_FIELDS.length ||
    keys.some((key, index) => key !== FORM_FIELDS[index]) ||
    FORM_FIELDS.some((field) => form.getAll(field).length !== 1)
  ) {
    return { error: errorResponse(400, 'Malformed acceptance request.') };
  }
  return { form };
}

async function getArtifact(env, key) {
  try {
    return await env.RELEASE_BUCKET.get(key);
  } catch {
    return null;
  }
}

export async function handleRequest(request, env) {
  const url = new URL(request.url);
  if (url.origin !== GATEWAY_ORIGIN || url.pathname !== DOWNLOAD_PATH || url.search) {
    return errorResponse(404, 'Not found.');
  }
  if (request.method !== 'POST') {
    return errorResponse(405, 'Method not allowed.');
  }
  if (request.headers.get('Origin') !== WEBSITE_ORIGIN) {
    return errorResponse(403, 'Download request is not authorized.');
  }

  const parsed = await parseForm(request);
  if (parsed.error) {
    return parsed.error;
  }
  const artifactId = parsed.form.get('artifact_id');
  const licenseSha256 = parsed.form.get('license_sha256');
  if (
    parsed.form.get('acceptance') !== 'accepted' ||
    !SHA256_PATTERN.test(licenseSha256 ?? '')
  ) {
    return errorResponse(403, 'License acceptance is required.');
  }

  if (artifactId === SYSTEM_TEST.artifactId) {
    if (licenseSha256 !== SYSTEM_TEST.licenseSha256) {
      return errorResponse(403, 'License acceptance does not match this artifact.');
    }
    const object = await getArtifact(env, SYSTEM_TEST.key);
    if (
      !object ||
      object.size !== SYSTEM_TEST.size ||
      object.httpEtag !== SYSTEM_TEST.etag
    ) {
      return errorResponse(503, 'Download artifact is unavailable.');
    }
    return attachmentResponse(object, SYSTEM_TEST);
  }

  const release = getRegisteredRelease(artifactId ?? '');
  if (!release) {
    return errorResponse(404, 'Download artifact was not found.');
  }
  if (licenseSha256 !== release.licenseSha256) {
    return errorResponse(403, 'License acceptance does not match this artifact.');
  }
  const object = await getArtifact(env, release.key);
  if (!object || !validateReleaseObject(object, release)) {
    return errorResponse(503, 'Download artifact is unavailable.');
  }
  return attachmentResponse(object, release);
}

export default {
  fetch: handleRequest,
};
