'use client';

import { FileMetadata } from '@/types/file';
import { X, Download, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

interface FilePreviewModalProps {
  file: FileMetadata | null;
  onClose: () => void;
}

export function FilePreviewModal({ file, onClose }: FilePreviewModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!file) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative z-50 w-full max-w-5xl animate-scale-in">
        <div className="rounded-2xl border bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-gray-900 shadow-2xl shadow-purple-500/20 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-white/50 dark:bg-gray-900/50 p-4">
            <h3 className="truncate text-lg font-semibold text-foreground pr-4">{file.name}</h3>
            <button
              onClick={onClose}
              className="flex size-8 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X size={20} className="text-muted-foreground" />
            </button>
          </div>

          <div className="p-6">
            {file.type === 'image' ? (
              <div className="flex items-center justify-center bg-purple-50/50 dark:bg-purple-950/20 rounded-xl min-h-[400px]">
                <img
                  src={file.url}
                  alt={file.name}
                  className="max-h-[600px] max-w-full object-contain rounded-lg"
                />
              </div>
            ) : file.type === 'pdf' ? (
              <div className="flex items-center justify-center bg-purple-50/50 dark:bg-purple-950/20 rounded-xl min-h-[400px]">
                <iframe
                  src={file.url}
                  className="w-full h-[600px] rounded-lg border-0"
                  title={file.name}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
                <div className="flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5">
                  <p className="text-3xl font-bold text-purple-600 uppercase">{file.extension}</p>
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">Preview not available</p>
                  <p className="text-sm text-muted-foreground">Download the file to view its contents</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 border-t bg-white/50 dark:bg-gray-900/50 p-4">
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors"
            >
              <ExternalLink size={16} />
              Open
            </a>
            
            <a
              href={file.url}
              download={file.name}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-4 py-2 text-sm font-medium text-white hover:from-purple-700 hover:to-purple-600 transition-all shadow-md hover:shadow-lg hover:shadow-purple-500/25"
            >
              <Download size={16} />
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
