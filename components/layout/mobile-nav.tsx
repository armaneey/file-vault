'use client';

import { LayoutDashboard, Folder, Upload, Heart } from 'lucide-react';
import { cn } from '@/lib';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Folder, label: 'Files', active: false },
  { icon: Upload, label: 'Uploads', active: false },
  { icon: Heart, label: 'Favorites', active: false },
];

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white dark:bg-gray-900 lg:hidden">
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              'flex flex-col items-center gap-1 rounded-xl p-2 text-xs font-medium transition-colors',
              item.active
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-muted-foreground'
            )}
          >
            <item.icon className="size-5" />
            <span>{item.label}</span>
          </button>
        ))}
        
        <button className="flex size-12 items-center justify-center -translate-y-4 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 text-white shadow-lg shadow-purple-500/30">
          <Upload className="size-6" />
        </button>
      </div>
    </nav>
  );
}
