'use client';

import { useState, useEffect, useMemo } from 'react';
import { uploadFile, listFiles, deleteFile, updateFileMetadata } from './actions/storage';
import { FileMetadata } from '@/types';
import { WelcomeSection, UploadSection, DashboardStats, RecentFiles } from '@/components/dashboard';
import { MobileNav } from '@/components/layout';
import { HardDrive, FolderOpen, Upload, Heart, CheckCircle, Loader2 } from 'lucide-react';
import { formatFileSize } from '@/lib';

export default function Home() {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ fileName: string; fileSize: string; progress: number } | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
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
    setUploadProgress({
      fileName: file.name,
      fileSize: formatFileSize(file.size),
      progress: 0
    });
    
    try {
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress = Math.min(progress + 10, 90);
        setUploadProgress(prev => prev ? { ...prev, progress } : null);
      }, 100);

      const formData = new FormData();
      formData.append('file', file);
      const uploadedFile = await uploadFile(formData);
      
      clearInterval(progressInterval);
      setUploadProgress(prev => prev ? { ...prev, progress: 100 } : null);
      
      setFiles((prev) => [uploadedFile, ...prev]);
     
      await loadFiles();
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    } catch (error) {
      console.error('Failed to upload file:', error);
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(null), 500);
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
      
      {uploadProgress && (
        <div className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700 animate-in slide-in-from-right">
          <div className="flex items-center gap-3">
            <Loader2 className="size-5 text-purple-600 animate-spin" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{uploadProgress.fileName}</p>
              <p className="text-xs text-muted-foreground">{uploadProgress.fileSize}</p>
            </div>
            <span className="text-sm font-semibold text-purple-600">{uploadProgress.progress}%</span>
          </div>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-600 transition-all duration-300"
              style={{ width: `${uploadProgress.progress}%` }}
            />
          </div>
        </div>
      )}
      {showSuccessToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-green-200 dark:border-green-800 animate-in slide-in-from-bottom">
          <div className="flex items-center gap-3">
            <CheckCircle className="size-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-foreground">Upload successful</p>
              <p className="text-xs text-muted-foreground">File has been saved to your storage</p>
            </div>
          </div>
        </div>
      )}
      
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
