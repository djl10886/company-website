export type LocalReleaseStatus = 'test' | 'available';

export interface LocalDownloadArtifact {
  label: string;
  fileName: string;
  downloadUrl: string;
  format: string;
  sizeLabel: string;
}

export interface LocalRelease {
  productName: string;
  editionName: string;
  status: LocalReleaseStatus;
  version: string;
  summary: string;
  artifacts: LocalDownloadArtifact[];
}

export const localRelease: LocalRelease = {
  productName: 'RealisticNPCs',
  editionName: 'Local',
  status: 'test',
  version: 'Download System Test',
  summary:
    'Download and run the RealisticNPCs backend with your Unreal Engine project from your own machine, independently of the future hosted service.',
  artifacts: [
    {
      label: 'Download Test File',
      fileName: 'realisticnpcs-download-test.txt',
      downloadUrl: '/downloads/realisticnpcs-download-test.txt',
      format: 'Plain text',
      sizeLabel: 'Less than 1 KB',
    },
  ],
};
