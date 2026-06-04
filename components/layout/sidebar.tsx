'use client';

import { useRouter, usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Folder, 
  Upload, 
  Heart, 
  Share2, 
  Trash2, 
  HardDrive,
  Lock,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Folder, label: 'My Files', href: '/files' },
  { icon: Upload, label: 'Uploads', href: '/uploads' },
  { icon: Heart, label: 'Favorites', href: '/favorites' },
  { icon: Share2, label: 'Shared', href: '/shared' },
  { icon: Trash2, label: 'Trash', href: '/trash' },
];

interface SidebarProps {
  isCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  className?: string;
}

export function Sidebar({ isCollapsed = false, onCollapse, isMobileOpen = false, onMobileClose, className }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r bg-white dark:bg-gray-900 transition-all duration-300 -translate-x-full lg:translate-x-0',
        isMobileOpen && 'translate-x-0',
        isCollapsed ? 'w-20' : 'w-64',
        className
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between border-b px-6">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-purple-400">
                <HardDrive className="size-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">FileVault</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={onMobileClose}
              className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"  >
              <X className="size-5 text-muted-foreground" />
            </button>
            <button
              onClick={() => onCollapse?.(!isCollapsed)}
              className="hidden rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 lg:block"  >
              {isCollapsed ? (
                <Menu className="size-5 text-muted-foreground" />
              ) : (
                <X className="size-5 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <button
                key={item.label}
                onClick={() => router.push(item.href)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                    : 'text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                )} >
                <item.icon className="size-5" />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {!isCollapsed && (
          <div className="border-t p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Storage</span>
              <span className="text-xs text-muted-foreground">8.24 GB / 20 GB</span>
            </div>
            <div className="mb-4 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div className="h-full w-[41%] rounded-full bg-gradient-to-r from-purple-600 to-purple-400" />
            </div>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-purple-300 px-4 py-3 text-sm font-medium text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-purple-900/20">
              <Lock className="size-4" />
              Unlock more storage
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
