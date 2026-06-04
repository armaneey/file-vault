'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FileMetadata } from '@/types/file';
import { FileIcon } from '@/components/ui/file-icon';
import { formatFileSize, formatDate } from '@/lib/formatters';
import { ArrowLeft, Download, Trash2, ExternalLink } from 'lucide-react';
import { deleteFile } from '@/app/actions/storage';

export default function FileDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [file, setFile] = useState<FileMetadata | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fileUrl = decodeURIComponent(params.id as string);
    setFile({
      name: fileUrl.split('/').pop() || 'Unknown',
      extension: fileUrl.split('.').pop() || '',
      description: 'Sample file description',
      uploadedAt: new Date().toISOString(),
      size: 1024 * 1024, // 1MB
      url: fileUrl,
      type: 'other',
    });
  }, [params.id]);

  const handleDelete = async () => {
    if (!file || isDeleting) return;
    
    if (!confirm('Are you sure you want to delete this file?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteFile(file.url);
      router.push('/');
    } catch (error) {
      console.error('Failed to delete file:', error);
      setIsDeleting(false);
    }
  };

  if (!file) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading file...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.push('/')}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground" >
        <ArrowLeft size={16} />
        Back to files
      </button>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="flex-shrink-0">
            <FileIcon type={file.type} size={80} className="rounded-xl" />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{file.name}</h1>
              {file.description && (
                <p className="mt-2 text-muted-foreground">{file.description}</p> )}
            </div>

            <div className="grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <p className="text-muted-foreground">File Size</p>
                <p className="font-medium text-foreground">{formatFileSize(file.size)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">File Type</p>
                <p className="font-medium text-foreground capitalize">{file.type}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Uploaded</p>
                <p className="font-medium text-foreground">{formatDate(file.uploadedAt)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Extension</p>
                <p className="font-medium text-foreground uppercase">{file.extension}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"  >
                <ExternalLink size={16} />
                Open File
              </a>
              
              <a
                href={file.url}
                download={file.name}
                className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted" >
                <Download size={16} />
                Download
              </a>
              
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 rounded-lg border border-destructive bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/20 disabled:cursor-not-allowed disabled:opacity-50" >
                <Trash2 size={16} />
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {file.type === 'image' && (
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Preview</h2>
          <img
            src={file.url}
            alt={file.name}
            className="mx-auto max-h-[600px] rounded-lg object-contain"
          />
        </div>
      )}
    </div>
  );
}
