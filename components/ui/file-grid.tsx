import { FileMetadata } from '@/types/file';
import { FileCard } from './file-card';
import { cn } from '@/lib/utils';

interface FileGridProps {
  files: FileMetadata[];
  onDelete?: (url: string) => void;
  onPreview?: (file: FileMetadata) => void;
  className?: string;
}

export function FileGrid({ files, onDelete, onPreview, className }: FileGridProps) {
  if (files.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
        <div className="mb-4 rounded-full bg-muted p-4">
          <svg
            className="size-8 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">No files yet</h3>
        <p className="text-sm text-muted-foreground">
          Upload your first file to get started
        </p>
      </div>
    );
  }

  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {files.map((file) => (
        <FileCard key={file.url} file={file} onDelete={onDelete} onPreview={onPreview} />
      ))}
    </div>
  );
}
