export const runtime = 'nodejs';

import { put, del, list } from '@vercel/blob';
import { FileMetadata, UploadResult } from '@/types/file';
import {
  getFileTypeFromMimeType,
  getFileExtension,
  getFileTypeFromExtension,
} from './file-types';

export async function uploadFileToBlob(
  file: File,
  description?: string
): Promise<UploadResult> {
  const bytes = await file.arrayBuffer();

  const blob = await put(file.name, bytes, {
    access: 'public',
    allowOverwrite: true
  });

 

  return {
    url: blob.url,
    pathname: file.name, // Use original filename instead of blob.pathname
    size: file.size,
    uploadedAt: new Date().toISOString(),
    contentType: file.type,
  };
}

export async function deleteFileFromBlob(url: string): Promise<void> {
  await del(url);
}

export async function listFilesFromBlob(): Promise<FileMetadata[]> {
  const { blobs } = await list({
    prefix: '',
  });

  return blobs.map((blob: any) => {
    // Try to get extension from pathname first, then from URL as fallback
    const pathname = blob.pathname;
    const extension = getFileExtension(pathname) || getFileExtension(blob.url);
    
    // Try to get type from MIME type first, then from extension as fallback
    const mimeType = blob.contentType || '';
    let type = getFileTypeFromMimeType(mimeType);
    
    // If MIME type detection failed, try extension-based detection
    if (type === 'other' && extension) {
      type = getFileTypeFromExtension(extension);
    }
    
    return {
      name: pathname,
      extension,
      description: undefined,
      uploadedAt: new Date().toISOString(),
      size: blob.size,
      url: blob.url,
      type,
    };
  });
}

export function createFileMetadata(
  uploadResult: UploadResult,
  description?: string
): FileMetadata {
  // Try to get extension from pathname first, then from URL as fallback
  const pathname = uploadResult.pathname;
  const extension = getFileExtension(pathname) || getFileExtension(uploadResult.url);
  
  // Try to get type from MIME type first, then from extension as fallback
  const mimeType = uploadResult.contentType || '';
  let type = getFileTypeFromMimeType(mimeType);
  
  // If MIME type detection failed, try extension-based detection
  if (type === 'other' && extension) {
    type = getFileTypeFromExtension(extension);
  }
  
  return {
    name: pathname,
    extension,
    description,
    uploadedAt: uploadResult.uploadedAt,
    size: uploadResult.size,
    url: uploadResult.url,
    type,
  };
}