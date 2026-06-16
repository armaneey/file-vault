'use client';

import { useState, useEffect, useMemo } from 'react';
import { uploadFile, listFiles, deleteFile, updateFileMetadata } from './actions/storage';
import { FileMetadata } from '@/types';
import { WelcomeSection, UploadSection, DashboardStats, RecentFiles } from '@/components/dashboard';
import { MobileNav } from '@/components/layout';
import { HardDrive, FolderOpen, Upload, Heart } from 'lucide-react';
import { formatFileSize } from '@/lib';

export default function Home() {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [isUploading, setIsUploading] = useState(false);
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

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const uploadedFile = await uploadFile(formData);
      setFiles((prev) => [uploadedFile, ...prev]);
      // Refresh from server to ensure consistency
      await loadFiles();
    } catch (error) {
      console.error('Failed to upload file:', error);
    } finally {
      setIsUploading(false);
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

  const stats = useMemo(() => {
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    const totalStorageGB = (totalSize / (1024 * 1024 * 1024)).toFixed(2);
    
    return {
      totalFiles: files.length,
      totalStorage: `${totalStorageGB} GB`,
      totalUploads: files.filter((f) => {
        const uploadDate = new Date(f.uploadedAt);
        const today = new Date();
        return uploadDate.toDateString() === today.toDateString();
      }).length,
      favorites: files.filter((f) => f.type === 'image').length,
    };
  }, [files]);

  return (
    <div className="pb-20 lg:pb-0">
      <WelcomeSection />
      
      <UploadSection onUpload={handleUpload} />
      
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStats
          title="Total Files"
          value={stats.totalFiles}
          icon={HardDrive}
          trend="+12 this week"/>
        <DashboardStats
          title="Total Storage"
          value={`${stats.totalStorage} / 20 GB`}
          icon={FolderOpen} />
        <DashboardStats
          title="Total Uploads"
          value={stats.totalUploads}
          icon={Upload}
          trend="37 today"/>
        <DashboardStats
          title="Favorites"
          value={stats.favorites}
          icon={Heart} />
      </div>
      
      <RecentFiles files={files} onRefresh={loadFiles} />
      
      <MobileNav />
    </div>
  );
}
