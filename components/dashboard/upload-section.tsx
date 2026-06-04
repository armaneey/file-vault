'use client';

import { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { cn } from '@/lib';

interface UploadSectionProps {
  onUpload?: (file: File) => void;
  className?: string;
}

export function UploadSection({ onUpload, className }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);

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
    if (file && onUpload) {
      onUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  return (
    <div className={cn('mb-8', className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'rounded-2xl border-2 border-dashed bg-white p-8 text-center transition-all dark:bg-gray-900',
          isDragging ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-300 dark:border-gray-700'
        )} >
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
          <UploadCloud className="size-8 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          Drag & drop files here
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          or click to browse from your computer
        </p>
        <label className="inline-flex cursor-pointer items-center rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-3 text-sm font-medium text-white hover:from-purple-700 hover:to-purple-600 transition-all">
          Select Files
          <input
            type="file"
            onChange={handleFileSelect}
            className="hidden" />
        </label>
      </div>
    </div>
  );
}
