import { FileType } from '@/types';

export const FILE_TYPE_CONFIG: Record<
  FileType,
  { label: string; extensions: string[]; color: string }
> = {
  image: {
    label: 'Image',
    extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'],
    color: 'purple',
  },
  pdf: {
    label: 'PDF',
    extensions: ['pdf'],
    color: 'red',
  },
  document: {
    label: 'Document',
    extensions: ['doc', 'docx', 'txt', 'rtf', 'odt', 'xls', 'xlsx'],
    color: 'blue',
  },
  video: {
    label: 'Video',
    extensions: ['mp4', 'mov', 'avi', 'mkv', 'webm'],
    color: 'green',
  },
  audio: {
    label: 'Audio',
    extensions: ['mp3', 'wav', 'm4a', 'ogg', 'flac', 'aac'],
    color: 'yellow',
  },
  archive: {
    label: 'Archive',
    extensions: ['zip', 'rar', '7z', 'tar', 'gz'],
    color: 'orange',
  },
  other: {
    label: 'Other',
    extensions: [],
    color: 'gray',
  },
};

export const FILE_TYPE_COLORS: Record<FileType, string> = {
  image: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
  pdf: 'text-red-600 bg-red-100 dark:bg-red-900/30',
  document: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
  video: 'text-green-600 bg-green-100 dark:bg-green-900/30',
  audio: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30',
  archive: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
  other: 'text-gray-600 bg-gray-100 dark:bg-gray-900/30',
};

export const STORAGE_LIMIT = 20 * 1024 * 1024 * 1024; 
export const MAX_FILE_SIZE = 100 * 1024 * 1024; 

// Dangerous file extensions that are blocked
export const BLOCKED_EXTENSIONS = [
  'exe', 'msi', 'app', 'dmg', 'pkg', // Executables
  'js', 'ts', 'jsx', 'tsx', 'mjs', 'cjs', // Scripts
  'sh', 'bash', 'zsh', 'fish', 'ps1', 'bat', 'cmd', // Shell scripts
  'php', 'asp', 'aspx', 'jsp', 'py', 'rb', 'go', 'rs', // Server code
  'sql', 'db', 'sqlite', // Databases
  'dll', 'so', 'dylib', // Libraries
  'com', 'scr', 'vbs', 'jar', 'war', // Other dangerous files
];

// Allowed MIME types for additional validation
export const ALLOWED_MIME_TYPES = [
  // Images
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp',
  // Documents
  'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain', 'text/rtf', 'application/rtf',
  // Videos
  'video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska', 'video/webm',
  // Audio
  'audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/ogg', 'audio/flac', 'audio/aac',
  // Archives
  'application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed',
  'application/x-tar', 'application/gzip',
];

// Helper function to check if file type is allowed
export function isFileTypeAllowed(extension: string, mimeType: string): boolean {
  const ext = extension.toLowerCase();
  
  // Check if extension is blocked
  if (BLOCKED_EXTENSIONS.includes(ext)) {
    return false;
  }
  
  // Check if MIME type is allowed
  if (mimeType && !ALLOWED_MIME_TYPES.includes(mimeType)) {
    return false;
  }
  
  return true;
}

// Helper function to sanitize file name
export function sanitizeFileName(fileName: string): string {
  // Remove any path traversal attempts
  const sanitized = fileName.replace(/\.\./g, '').replace(/[\/\\]/g, '');
  
  // Remove special characters that could be dangerous
  const cleaned = sanitized.replace(/[<>:"|?*\x00-\x1F]/g, '');
  
  return cleaned;
} 
