'use client';

import { FileMetadata } from '@/types';
import { FileIcon } from '@/components/ui';
import { formatFileSize, formatRelativeTime } from '@/lib';
import { MoreVertical, Download, Eye, Trash2 } from 'lucide-react';
import { cn } from '@/lib';
import { deleteFile } from '@/app/actions/storage';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FilePreviewModal } from '@/components/ui/file-preview-modal';

interface RecentFilesProps {
  files: FileMetadata[];
  onRefresh?: () => void;
  className?: string;
}

export function RecentFiles({ files, onRefresh, className }: RecentFilesProps) {
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<FileMetadata | null>(null);
  const router = useRouter();

  const handlePreview = (file: FileMetadata) => {
    setPreviewFile(file);
  };

  const handleDownload = (file: FileMetadata) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    link.click();
  };

  const handleDelete = async (url: string) => {
    setDeletingUrl(url);
    try {
      await deleteFile(url);
      onRefresh?.();
    } catch (error) {
      console.error('Failed to delete file:', error);
    } finally {
      setDeletingUrl(null);
    }
  };

  return (
    <div className={cn('rounded-2xl border bg-white p-6 shadow-sm dark:bg-gray-900', className)}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Recent Files</h2>
        <button 
          onClick={() => router.push('/files')}
          className="text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
        >
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
              className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:shadow-md hover:border-purple-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-purple-700 dark:hover:shadow-lg dark:hover:shadow-purple-500/10"  >
              <FileIcon type={file.type} size={40} className="rounded-lg transition-transform group-hover:scale-105" />
              
              <div className="flex min-w-0 flex-1">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground group-hover:text-purple-600 transition-colors">{file.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatFileSize(file.size)} • {formatRelativeTime(file.uploadedAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button 
                  onClick={() => handlePreview(file)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-purple-100 hover:text-purple-600 dark:hover:bg-purple-900/20 dark:hover:text-purple-400 transition-colors"
                >
                  <Eye className="size-4" />
                </button>
                <button 
                  onClick={() => handleDownload(file)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-purple-100 hover:text-purple-600 dark:hover:bg-purple-900/20 dark:hover:text-purple-400 transition-colors"
                >
                  <Download className="size-4" />
                </button>
                <button 
                  onClick={() => handleDelete(file.url)}
                  disabled={deletingUrl === file.url}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <FilePreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
    </div>
  );
}
