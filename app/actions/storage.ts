'use server';

import { uploadFileToBlob, deleteFileFromBlob, listFilesFromBlob, createFileMetadata } from '@/lib/blob-utils';
import { FileMetadata, UploadResult } from '@/types';
import { BLOCKED_EXTENSIONS, ALLOWED_MIME_TYPES, MAX_FILE_SIZE, isFileTypeAllowed, sanitizeFileName } from '@/constants';

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

function checkBlobConfiguration(): boolean {
  if (!BLOB_TOKEN) {
    throw new Error('')
  }
  return true;
}

export async function uploadFile(formData: FormData): Promise<FileMetadata> {
  const file = formData.get('file') as File;
  const description = formData.get('description') as string | null;

  if (!file) {
    throw new Error('No file provided');
  }

 
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
  }

  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  if (BLOCKED_EXTENSIONS.includes(extension)) {
    throw new Error(`File type .${extension} is not allowed for security reasons`);
  }


  if (file.type && !ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error(`File type ${file.type} is not allowed`);
  }


  const sanitizedName = sanitizeFileName(file.name);

  checkBlobConfiguration();

  try {
    const sanitizedFile = new File([file], sanitizedName, {
      type: file.type,
      lastModified: file.lastModified,
    });

    const uploadResult: UploadResult = await uploadFileToBlob(sanitizedFile, description || undefined);
    return createFileMetadata(uploadResult, description || undefined);
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Failed to upload file');
  }
}

export async function deleteFile(url: string): Promise<void> {
  checkBlobConfiguration();

  try {
    await deleteFileFromBlob(url);
  } catch (error) {
    console.error('Delete error:', error);
    throw new Error('Failed to delete file');
  }
}

export async function listFiles(): Promise<FileMetadata[]> {
  checkBlobConfiguration();

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
