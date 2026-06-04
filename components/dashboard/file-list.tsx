'use client';

import { FileMetadata } from '@/types';
import { FileIcon } from '@/components/ui';
import { formatFileSize, formatRelativeTime } from '@/lib';
import { Download, Eye, MoreVertical, Heart } from 'lucide-react';

interface FileListProps {
  files: FileMetadata[];
  isLoading?: boolean;
  emptyMessage?: string;
  emptySubMessage?: string;
  showFavorite?: boolean;
  onFavorite?: (file: FileMetadata) => void;
  onPreview?: (file: FileMetadata) => void;
  onDelete?: (url: string) => void;
}

export function FileList({ 
  files, 
  isLoading = false, 
  emptyMessage = 'No files yet',
  emptySubMessage,
  showFavorite = false,
  onFavorite,
  onPreview,
  onDelete
}: FileListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mx-auto mb-4 size-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading files...</p>
        </div>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-12 text-center shadow-sm dark:bg-gray-900">
        <p className="text-muted-foreground">{emptyMessage}</p>
        {emptySubMessage && (
          <p className="text-sm text-muted-foreground mt-2">{emptySubMessage}</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {files.map((file) => (
        <div
          key={file.url}
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800" >
          <FileIcon type={file.type} size={40} className="rounded-lg" />
          
          <div className="flex min-w-0 flex-1">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {formatFileSize(file.size)} • {formatRelativeTime(file.uploadedAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {showFavorite && onFavorite && (
              <button 
                onClick={() => onFavorite(file)}
                className="rounded-lg p-2 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20"  >
                <Heart className="size-4" />
              </button>
            )}
            {onPreview && (
              <button 
                onClick={() => onPreview(file)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700"  >
                <Eye className="size-4" />
              </button>
            )}
            <a
              href={file.url}
              download={file.name}
              className="rounded-lg p-2 text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700" >
              <Download className="size-4" />
            </a>
            <button className="rounded-lg p-2 text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700">
              <MoreVertical className="size-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
