import { LucideIcon, TrendingUp } from 'lucide-react';
import { cn } from '@/lib';

interface DashboardStatsProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

export function DashboardStats({ title, value, icon: Icon, trend, className }: DashboardStatsProps) {
  return (
    <div className={cn(
      'rounded-2xl border bg-white p-6 shadow-sm dark:bg-gray-900',
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex size-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/20">
          <Icon className="size-6 text-purple-600 dark:text-purple-400" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
            <TrendingUp className="size-3" />
            <span>{trend}</span>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="mt-1 text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
}
