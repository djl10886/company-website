const DOWNLOAD_ORIGIN = 'https://downloads.clankrintelligence.com';

export const LOCAL_RELEASE_LICENSE = {
  label: 'RealisticNPCs Local License Agreement',
  url: '/legal/realisticnpcs-local/0.4.0/LICENSE.txt',
  sha256: '2b514ea59e74f917fda45607f91b755399f2b7f286b9a6b37e259782391b9dd1',
} as const;

export const LOCAL_DEPLOYMENT_SCOPE =
  'RealisticNPCs Local 0.4.0 is intended for development and developer-controlled environments. Distribution to player machines requires a developer-provided inference service and authentication solution; this player-facing infrastructure is not included with RealisticNPCs.';

export interface LocalDownloadArtifact {
  artifactId: string;
  label: string;
  displayName: string;
  fileName: string;
  downloadEndpoint: string;
  platformLabel: string;
  format: string;
  sizeLabel?: string;
}

export interface LocalRelease {
  productName: string;
  editionName: string;
  version: string;
  status: 'test' | 'available';
  summary: string;
  artifacts: LocalDownloadArtifact[];
}

export const localRelease: LocalRelease = {
  productName: 'RealisticNPCs',
  editionName: 'Local',
  version: '0.4.0',
  status: 'test',
  summary:
    'The public download path is being prepared for RealisticNPCs Local for Unreal Engine.',
  artifacts: [
    {
      artifactId:
        'realisticnpcs-local-unreal-v0.4.0-windows-x86_64-system-test',
      label: 'I Agree and Download',
      displayName: 'RealisticNPCs download system test',
      fileName: 'realisticnpcs-download-test.txt',
      downloadEndpoint: DOWNLOAD_ORIGIN + '/download',
      platformLabel: 'Public delivery test',
      format: 'Text file',
      sizeLabel: '226 bytes',
    },
  ],
};
