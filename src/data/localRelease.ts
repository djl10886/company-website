const DOWNLOAD_ORIGIN = 'https://downloads.clankrintelligence.com';
const INTERNAL_PLACEHOLDER_DOWNLOAD_URL =
  DOWNLOAD_ORIGIN + '/realisticnpcs-download-test.txt';

export const LOCAL_DEPLOYMENT_SCOPE =
  'RealisticNPCs Local 0.4.0 is intended for development and developer-controlled environments. Distribution to player machines requires a developer-provided inference service and authentication solution; this player-facing infrastructure is not included with RealisticNPCs.';

export interface LocalDownloadArtifact {
  label: string;
  displayName: string;
  fileName: string;
  downloadUrl: string;
  platformLabel: string;
  format: string;
  sizeLabel?: string;
}

export interface LocalRelease {
  productName: string;
  editionName: string;
  version: string;
  summary: string;
  artifacts: LocalDownloadArtifact[];
}

export const localRelease: LocalRelease = {
  productName: 'RealisticNPCs',
  editionName: 'Local',
  version: '0.4.0',
  summary:
    'Download RealisticNPCs Local for Unreal Engine. Its managed backend runs locally on 64-bit Windows.',
  artifacts: [
    {
      label: 'Download for Windows',
      displayName: 'RealisticNPCs Local for Unreal Engine',
      fileName: 'RealisticNPCs-Local-Unreal-v0.4.0-Windows-x86_64.zip',
      downloadUrl: INTERNAL_PLACEHOLDER_DOWNLOAD_URL,
      platformLabel: 'Windows 10 and Windows 11 (64-bit)',
      format: 'ZIP archive',
    },
  ],
};
