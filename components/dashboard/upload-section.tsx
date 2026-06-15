'use client';

import { useState } from 'react';
import { UploadCloud, AlertCircle } from 'lucide-react';
import { cn } from '@/lib';
import { BLOCKED_EXTENSIONS, ALLOWED_MIME_TYPES, MAX_FILE_SIZE } from '@/constants';

interface UploadSectionProps {
  onUpload?: (file: File) => void;
  className?: string;
}

export function UploadSection({ onUpload, className }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    // File size validation
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
    }

    // File extension validation
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    if (BLOCKED_EXTENSIONS.includes(extension)) {
      return `File type .${extension} is not allowed for security reasons`;
    }

    // MIME type validation
    if (file.type && !ALLOWED_MIME_TYPES.includes(file.type)) {
      return `File type ${file.type} is not allowed`;
    }

    return null;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      setError(null);
      if (onUpload) {
        onUpload(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      setError(null);
      if (onUpload) {
        onUpload(file);
      }
    }
  };

  return (
    <div className={cn('mb-8', className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'rounded-2xl border-2 border-dashed bg-white p-6 sm:p-8 text-center transition-all dark:bg-gray-900',
          isDragging ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-300 dark:border-gray-700'
        ) } >
        <div className="mx-auto mb-4 flex size-12 sm:size-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
          <UploadCloud className="size-6 sm:size-8 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="mb-2 text-base sm:text-lg font-semibold text-foreground">
          Drag & drop files here
        </h3>
        <p className="mb-4 text-xs sm:text-sm text-muted-foreground">
          or click to browse from your computer
        </p>
        <label className="inline-flex cursor-pointer items-center rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white hover:from-purple-700 hover:to-purple-600 transition-all">
          Select Files
          <input
            type="file"
            onChange={handleFileSelect}
            className="hidden" />
        </label>
        
        {error && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-red-600 dark:text-red-400">
            <AlertCircle className="size-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
      
      <p className="mt-2 text-[10px] sm:text-xs text-muted-foreground text-center">
        Allowed: Images, PDFs, Documents, Videos, Audio, Archives (Max 100MB)
      </p>
    </div>
  );
}
