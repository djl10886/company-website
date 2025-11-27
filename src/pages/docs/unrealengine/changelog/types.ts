export interface Release {
  version: string;
  date: string;
  summary: string;
  highlights: string[];
  content: React.ReactNode;
}
