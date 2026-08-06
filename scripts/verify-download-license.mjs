import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const licenseUrl = new URL(
  '../public/legal/realisticnpcs-local/0.4.0/LICENSE.txt',
  import.meta.url,
);
const expectedSize = 12_832;
const expectedSha256 =
  '2b514ea59e74f917fda45607f91b755399f2b7f286b9a6b37e259782391b9dd1';

const bytes = await readFile(licenseUrl);
const sha256 = createHash('sha256').update(bytes).digest('hex');

if (bytes.length !== expectedSize) {
  throw new Error(`Public license size is ${bytes.length}; expected ${expectedSize}.`);
}
if (sha256 !== expectedSha256) {
  throw new Error(`Public license SHA-256 is ${sha256}; expected ${expectedSha256}.`);
}
if (bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) {
  throw new Error('Public license must not contain a UTF-8 BOM.');
}
for (let index = 0; index < bytes.length; index += 1) {
  if (bytes[index] === 0x0a && (index === 0 || bytes[index - 1] !== 0x0d)) {
    throw new Error('Public license must use CRLF line endings.');
  }
}
if (bytes.at(-2) !== 0x0d || bytes.at(-1) !== 0x0a) {
  throw new Error('Public license must end with CRLF.');
}

process.stdout.write(
  `Verified ${fileURLToPath(licenseUrl)} (${expectedSize} bytes, ${expectedSha256}).\n`,
);
