import { put, del, list } from '@vercel/blob';
import { FileMetadata, UploadResult } from '@/types/file';
import { getFileTypeFromMimeType, getFileExtension } from './file-types';

export async function uploadFileToBlob(
  file: File,
  description?: string
): Promise<UploadResult> {
  const blob = await put(file.name, file, {
    access: 'public',
  });

  return {
    url: blob.url,
    pathname: blob.pathname,
    size: file.size,
    uploadedAt: new Date().toISOString(), // ✅ FIXED
    contentType: file.type,
  };
}

export async function deleteFileFromBlob(url: string): Promise<void> {
  await del(url);
}

export async function listFilesFromBlob(): Promise<FileMetadata[]> {
  const { blobs } = await list();

  return blobs.map((blob: any) => ({
    name: blob.pathname,
    extension: getFileExtension(blob.pathname),
    description: blob.metadata?.description as string | undefined,
    uploadedAt: new Date().toISOString(), // ✅ FIXED
    size: blob.size,
    url: blob.url,
    type: getFileTypeFromMimeType(blob.contentType || ''),
  }));
}

export function createFileMetadata(
  uploadResult: UploadResult,
  description?: string
): FileMetadata {
  return {
    name: uploadResult.pathname,
    extension: getFileExtension(uploadResult.pathname),
    description,
    uploadedAt: uploadResult.uploadedAt,
    size: uploadResult.size,
    url: uploadResult.url,
    type: getFileTypeFromMimeType(uploadResult.contentType),
  };
}