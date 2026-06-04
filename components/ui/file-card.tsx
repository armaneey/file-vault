'use client';

import { FileMetadata } from '@/types/file';
import { FileIcon } from './file-icon';
import { formatFileSize, formatRelativeTime } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import { Download, Trash2, ExternalLink, Eye } from 'lucide-react';
import { deleteFile } from '@/app/actions/storage';
import { useState } from 'react';

interface FileCardProps {
  file: FileMetadata;
  onDelete?: (url: string) => void;
  onPreview?: (file: FileMetadata) => void;
  className?: string;
}

export function FileCard({ file, onDelete, onPreview, className }: FileCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    try {
      await deleteFile(file.url);
      onDelete?.(file.url);
    } catch (error) {
      console.error('Failed to delete file:', error);
      setIsDeleting(false);
    }
  };

  return (
    <div className={cn(
      'group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-card p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1',
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative flex items-start gap-4">
        <div className="flex-shrink-0">
          <FileIcon type={file.type} size={48} className="rounded-xl shadow-sm" />
        </div>
        
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h3 className="truncate font-semibold text-sm text-foreground group-hover:text-purple-600 transition-colors">
            {file.name}
          </h3>
          
          {file.description && (
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {file.description}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{formatFileSize(file.size)}</span>
            <span className="text-muted-foreground/50">•</span>
            <span>{formatRelativeTime(file.uploadedAt)}</span>
          </div>
        </div>
      </div>

      <div className="relative mt-5 flex items-center justify-end gap-2 opacity-0 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
        {file.type === 'image' && (
          <button
            onClick={() => onPreview?.(file)}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors"
          >
            <Eye size={14} />
            Preview
          </button>
        )}
        
        <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors"
        >
          <ExternalLink size={14} />
          Open
        </a>
        
        <a
          href={file.url}
          download={file.name}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors"
        >
          <Download size={14} />
          Download
        </a>
        
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
        >
          <Trash2 size={14} />
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
