'use client';

import { FileMetadata } from '@/types';
import { FileIcon } from '@/components/ui';
import { formatFileSize, formatRelativeTime } from '@/lib';
import { MoreVertical, Download, Eye } from 'lucide-react';
import { cn } from '@/lib';

interface RecentFilesProps {
  files: FileMetadata[];
  className?: string;
}

export function RecentFiles({ files, className }: RecentFilesProps) {
  return (
    <div className={cn('rounded-2xl border bg-white p-6 shadow-sm dark:bg-gray-900', className)}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Recent Files</h2>
        <button className="text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
          View all files
        </button>
      </div>

      <div className="space-y-4">
        {files.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-muted-foreground">No files uploaded yet</p>
          </div>
        ) : (
          files.slice(0, 5).map((file) => (
            <div
              key={file.url}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800/50 dark:hover:bg-gray-800"  >
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
                <button className="rounded-lg p-2 text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700">
                  <Eye className="size-4" />
                </button>
                <button className="rounded-lg p-2 text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700">
                  <Download className="size-4" />
                </button>
                <button className="rounded-lg p-2 text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700">
                  <MoreVertical className="size-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
