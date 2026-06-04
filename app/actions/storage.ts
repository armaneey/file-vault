'use server';

import { uploadFileToBlob, deleteFileFromBlob, listFilesFromBlob, createFileMetadata } from '@/lib/blob-utils';
import { FileMetadata, UploadResult } from '@/types/file';

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

function checkBlobConfiguration(): boolean {
  if (!BLOB_TOKEN) {
    console.warn('BLOB_READ_WRITE_TOKEN is not configured. Running in mock mode.');
    return false;
  }
  return true;
}

export async function uploadFile(formData: FormData): Promise<FileMetadata> {
  const file = formData.get('file') as File;
  const description = formData.get('description') as string | null;

  if (!file) {
    throw new Error('No file provided');
  }

  if (!checkBlobConfiguration()) {
    return {
      name: file.name,
      extension: file.name.split('.').pop() || '',
      description: description || undefined,
      uploadedAt: new Date().toISOString(),
      size: file.size,
      url: URL.createObjectURL(file),
      type: getFileTypeFromMimeType(file.type),
    };
  }

  try {
    const uploadResult: UploadResult = await uploadFileToBlob(file, description || undefined);
    return createFileMetadata(uploadResult, description || undefined);
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Failed to upload file');
  }
}

export async function deleteFile(url: string): Promise<void> {
  if (!checkBlobConfiguration()) {
    console.warn('Mock mode: File deletion simulated');
    return;
  }

  try {
    await deleteFileFromBlob(url);
  } catch (error) {
    console.error('Delete error:', error);
    throw new Error('Failed to delete file');
  }
}

export async function listFiles(): Promise<FileMetadata[]> {
  if (!checkBlobConfiguration()) {
    return [];
  }

  try {
    return await listFilesFromBlob();
  } catch (error) {
    console.error('List error:', error);
    throw new Error('Failed to list files');
  }
}

function getFileTypeFromMimeType(mimeType: string): 'image' | 'pdf' | 'document' | 'video' | 'audio' | 'archive' | 'other' {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType === 'application/pdf') return 'pdf';
  if (mimeType.includes('document') || mimeType.includes('sheet') || mimeType.includes('presentation') || mimeType.startsWith('text/')) return 'document';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('tar') || mimeType.includes('gzip')) return 'archive';
  return 'other';
}
