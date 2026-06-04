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
    extensions: ['doc', 'docx', 'txt', 'rtf', 'odt'],
    color: 'blue',
  },
  video: {
    label: 'Video',
    extensions: ['mp4', 'mov', 'avi', 'mkv', 'webm'],
    color: 'green',
  },
  audio: {
    label: 'Audio',
    extensions: ['mp3', 'wav', 'ogg', 'flac', 'aac'],
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
