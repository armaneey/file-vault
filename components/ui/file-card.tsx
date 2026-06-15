'use client';

import { FileMetadata } from '@/types/file';
import { FileIcon } from './file-icon';
import { formatFileSize, formatRelativeTime } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import { Download, Trash2, ExternalLink, Eye, Edit } from 'lucide-react';
import { deleteFile } from '@/app/actions/storage';
import { useState, useEffect } from 'react';
import { EditFileModal } from './edit-file-modal';

interface FileCardProps {
  file: FileMetadata;
  onDelete?: (url: string) => void;
  onEdit?: (url: string, name: string, description: string) => void;
  onPreview?: (file: FileMetadata) => void;
  className?: string;
}

export function FileCard({ file, onDelete, onEdit, onPreview, className }: FileCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const handleEdit = (name: string, description: string) => {
    onEdit?.(file.url, name, description);
  };

  return (
    <div className={cn(
      'group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-card p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1',
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative flex items-start gap-3 sm:gap-4">
        <div className="flex-shrink-0">
          <FileIcon type={file.type} size={isMobile ? 40 : 48} className="rounded-xl shadow-sm" />
        </div>
        
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:gap-2">
          <h3 className="truncate text-xs sm:text-sm font-semibold text-foreground group-hover:text-purple-600 transition-colors">
            {file.name}
          </h3>
          
          {file.description && (
            <p className="line-clamp-2 text-[10px] sm:text-xs text-muted-foreground">
              {file.description}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{formatFileSize(file.size)}</span>
            <span className="text-muted-foreground/50">•</span>
            <span>{formatRelativeTime(file.uploadedAt)}</span>
          </div>
        </div>
      </div>

      <div className="relative mt-4 sm:mt-5 flex items-center justify-end gap-1 sm:gap-2 opacity-100 sm:opacity-0 transition-all duration-300 transform translate-y-0 sm:translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
        {file.type === 'image' && (
          <button
            onClick={() => onPreview?.(file)}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors"
          >
            <Eye size={14} />
            Preview
          </button>
        )}
        
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="inline-flex items-center gap-1 rounded-lg px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-medium text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors"
        >
          <Edit size={isMobile ? 12 : 14} />
          <span className="hidden sm:inline">Edit</span>
        </button>
        
        <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-lg px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-medium text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors"
        >
          <ExternalLink size={isMobile ? 12 : 14} />
          <span className="hidden sm:inline">Open</span>
        </a>
        
        <a
          href={file.url}
          download={file.name}
          className="inline-flex items-center gap-1 rounded-lg px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-medium text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors"
        >
          <Download size={isMobile ? 12 : 14} />
          <span className="hidden sm:inline">Download</span>
        </a>
        
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="inline-flex items-center gap-1 rounded-lg px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-medium text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
        >
          <Trash2 size={isMobile ? 12 : 14} />
          <span className="hidden sm:inline">{isDeleting ? 'Deleting...' : 'Delete'}</span>
        </button>
      </div>
      
      <EditFileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        fileName={file.name}
        fileDescription={file.description}
        onSave={handleEdit}
      />
    </div>
  );
}
