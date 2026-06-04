'use client';

import { ReactNode, useState } from 'react';
import { Sidebar, Header } from '@/components/layout';
import { cn } from '@/lib';

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-rose-50/30 dark:bg-gray-950">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onCollapse={setIsSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />
      <div className={cn('transition-all duration-300', isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64')}>
        <Header onMobileMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className={cn('p-4 lg:p-6', className)}>
          {children}
        </main>
      </div>
      
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
}
