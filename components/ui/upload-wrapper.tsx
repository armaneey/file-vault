'use client';

import { useState, useRef } from 'react';
import { Upload, X, FileText, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadWrapperProps {
  onUpload: (file: File, description?: string) => void;
  isUploading?: boolean;
  className?: string;
}

export function UploadWrapper({ onUpload, isUploading = false, className }: UploadWrapperProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile, description || undefined);
      setSelectedFile(null);
      setDescription('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setDescription('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'group relative overflow-hidden rounded-2xl border-2 border-dashed p-10 transition-all duration-300 cursor-pointer',
            isDragging 
              ? 'border-purple-500 bg-gradient-to-br from-purple-500/10 to-purple-500/5 scale-[1.02]' 
              : 'border-gray-300 dark:border-gray-700 hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-500/5 hover:to-transparent'
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          <div className="relative flex flex-col items-center justify-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 group-hover:from-purple-500/30 group-hover:to-purple-500/10 transition-all duration-300">
              <Upload className="size-8 text-purple-600" />
            </div>
            
            <p className="mb-2 text-base font-semibold text-foreground group-hover:text-purple-600 transition-colors">
              Drop your file here, or click to browse
            </p>
            
            <p className="text-center text-sm text-muted-foreground">
              Supports all file types<br />
              <span className="text-xs opacity-70">(images, PDFs, documents, videos, audio, archives)</span>
            </p>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            accept="*/*"
          />
        </div>
      ) : (
        <div className="animate-scale-in rounded-2xl border bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-card p-6 shadow-lg shadow-purple-500/10">
          <div className="flex items-start gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 shadow-sm">
              <FileText className="size-7 text-purple-600" />
            </div>
            
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                
                <button
                  onClick={handleCancel}
                  className="flex-shrink-0 rounded-lg p-1.5 text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description (optional)"
                className="min-h-[70px] w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
                maxLength={500}/>
              
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-4 py-3 text-sm font-semibold text-white hover:from-purple-700 hover:to-purple-600 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-purple-500/25" >
                {isUploading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Upload size={16} />
                    Upload File
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
