'use client';

import { useState, useEffect } from 'react';
import { listFiles, deleteFile, updateFileMetadata } from '../actions/storage';
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
      setFiles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (url: string) => {
    try {
      await deleteFile(url);
      await loadFiles();
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  const handleEdit = async (url: string, name: string, description: string) => {
    try {
      await updateFileMetadata(url, name, description);
      await loadFiles();
    } catch (error) {
      console.error('Failed to update file:', error);
    }
  };

  const handlePreview = (file: FileMetadata) => {
    if (file.type === 'image') {
      window.open(file.url, '_blank');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-2">My Files</h1>
      <p className="text-muted-foreground mb-8">
        Manage all your uploaded files
      </p>

      <FileList
        files={files}
        isLoading={isLoading}
        emptyMessage="No files uploaded yet"
        onDelete={handleDelete}
        onEdit={handleEdit}
        onPreview={handlePreview}
      />
    </div>
  );
}