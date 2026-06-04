'use client';

import { useState, useEffect } from 'react';
import { listFiles } from '../actions/storage';
import { FileMetadata } from '@/types';
import { FileList } from '@/components/dashboard';

export default function FilesPage() {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    setIsLoading(true);
    try {
      const fileList = await listFiles();
      setFiles(fileList);
    } catch (error) {
      console.error('Failed to load files:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-2">My Files</h1>
      <p className="text-muted-foreground mb-8">Manage all your uploaded files</p>

      <FileList 
        files={files} 
        isLoading={isLoading}
        emptyMessage="No files uploaded yet"
      />
    </div>
  );
}
