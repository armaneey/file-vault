'use client';

import { useState } from 'react';
import { Search, Bell, User, ChevronDown, Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/ui';
import { cn } from '@/lib';

interface HeaderProps {
  onMobileMenuClick?: () => void;
}

export function Header({ onMobileMenuClick }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <button
          onClick={onMobileMenuClick}
          className="lg:hidden rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800"  >
          <Menu className="size-5 text-muted-foreground" />
        </button>

        <div className="hidden flex-1 max-w-md lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search files and folders..."
              className="w-full rounded-xl border bg-gray-50 dark:bg-gray-800 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Bell className="size-5 text-muted-foreground" />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500" />
          </button>

          <ThemeToggle />

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800" >
              <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-400">
                <User className="size-4 text-white" />
              </div>
              <ChevronDown className="size-4 text-muted-foreground hidden sm:block" />
            </button>

            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border bg-white dark:bg-gray-900 p-2 shadow-lg">
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-gray-100 dark:hover:bg-gray-800">
                    <User className="size-4" />
                    Profile
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-gray-100 dark:hover:bg-gray-800">
                    Settings
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-red-50 dark:hover:bg-red-900/20">
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
