import { FileType } from '@/types/file';
import { 
  Image, 
  FileText, 
  Video, 
  Music, 
  Archive, 
  File,
  FileCode 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileIconProps {
  type: FileType;
  className?: string;
  size?: number;
}

export function FileIcon({ type, className, size = 48 }: FileIconProps) {
  const iconMap = {
    image: {
      Icon: Image,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    pdf: {
      Icon: FileText,
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
    },
    document: {
      Icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    video: {
      Icon: Video,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    audio: {
      Icon: Music,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
    archive: {
      Icon: Archive,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    },
    other: {
      Icon: File,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100 dark:bg-gray-900/30',
    },
  };

  const { Icon, color, bgColor } = iconMap[type];

  return (
    <div className={cn('flex items-center justify-center rounded-xl', bgColor, className)}>
      <Icon className={cn(color)} size={size} />
    </div>
  );
}
