"use server";

import {
  uploadFileToBlob,
  deleteFileFromBlob,
  listFilesFromBlob,
  createFileMetadata,
} from "@/lib/blob-utils";
import { FileMetadata, UploadResult } from "@/types";
import {
  BLOCKED_EXTENSIONS,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE,
  isFileTypeAllowed,
  sanitizeFileName,
} from "@/constants";

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

function checkBlobConfiguration(): boolean {
  if (!BLOB_TOKEN) {
    throw new Error(
      "Vercel Blob is not configured. Please set BLOB_READ_WRITE_TOKEN environment variable.",
    );
  }
  return true;
}

export async function uploadFile(formData: FormData): Promise<FileMetadata> {
  const file = formData.get("file") as File;
  const description = formData.get("description") as string | null;

  if (!file) {
    throw new Error("No file provided");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File size exceeds maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    );
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  if (BLOCKED_EXTENSIONS.includes(extension)) {
    throw new Error(
      `File type .${extension} is not allowed for security reasons`,
    );
  }

  if (file.type && !ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error(`File type ${file.type} is not allowed`);
  }

  const sanitizedName = sanitizeFileName(file.name);

  checkBlobConfiguration();
  console.log("BLOB TOKEN EXISTS:", !!process.env.BLOB_READ_WRITE_TOKEN);

  try {
    const sanitizedFile = new File([file], sanitizedName, {
      type: file.type,
      lastModified: file.lastModified,
    });

    const uploadResult: UploadResult = await uploadFileToBlob(
      sanitizedFile,
      description || undefined,
    );
    return createFileMetadata(uploadResult, description || undefined);
  } catch (error) {
    console.error("Upload error FULL:", error);
    throw error;
  }
}

export async function deleteFile(url: string): Promise<void> {
  checkBlobConfiguration();

  try {
    await deleteFileFromBlob(url);
  } catch (error) {
    console.error("Delete error:", error);
    throw new Error("Failed to delete file");
  }
}

export async function listFiles(): Promise<FileMetadata[]> {
  checkBlobConfiguration();

  try {
    return await listFilesFromBlob();
  } catch (error) {
    console.error("List error:", error);
    throw new Error("Failed to list files");
  }
}

export async function updateFileMetadata(url: string, name: string, description?: string): Promise<FileMetadata> {
  checkBlobConfiguration();

  try {
    // Vercel Blob doesn't support direct metadata updates
    // We need to copy the file with new metadata
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], name, { type: blob.type });
    
    const uploadResult = await uploadFileToBlob(file, description);
    // Delete the old file
    await deleteFileFromBlob(url);
    
    return createFileMetadata(uploadResult, description);
  } catch (error) {
    console.error('Update metadata error:', error);
    throw new Error('Failed to update file metadata');
  }
}

function getFileTypeFromMimeType(
  mimeType: string,
): "image" | "pdf" | "document" | "video" | "audio" | "archive" | "other" {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType === "application/pdf") return "pdf";
  if (
    mimeType.includes("document") ||
    mimeType.includes("sheet") ||
    mimeType.includes("presentation") ||
    mimeType.startsWith("text/")
  )
    return "document";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("audio/")) return "audio";
  if (
    mimeType.includes("zip") ||
    mimeType.includes("rar") ||
    mimeType.includes("tar") ||
    mimeType.includes("gzip")
  )
    return "archive";
  return "other";
}
