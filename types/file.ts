export type FileType = 'image' | 'pdf' | 'document' | 'video' | 'audio' | 'archive' | 'other';

export interface FileMetadata {
  name: string;
  extension: string;
  description?: string;
  uploadedAt: string;
  size: number;
  url: string;
  type: FileType;
}

export interface UploadResult {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
  contentType: string;
}
