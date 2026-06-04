import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <div className={cn(
      'group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1',
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative">
        <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5">
          <Icon className="size-6 text-purple-600" />
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className="text-xs text-muted-foreground">{trend}</p>
          )}
        </div>
      </div>
    </div>
  );
}
