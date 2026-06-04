'use client';

import { ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type SortOption = 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc' | 'size-asc' | 'size-desc';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'date-asc', label: 'Date (Oldest)' },
  { value: 'date-desc', label: 'Date (Newest)' },
  { value: 'size-asc', label: 'Size (Smallest)' },
  { value: 'size-desc', label: 'Size (Largest)' },
];

export function SortDropdown({ value, onChange, className }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = SORT_OPTIONS.find((opt) => opt.value === value);

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-2xl border bg-white/50 dark:bg-gray-950/50 px-4 py-3 text-sm text-foreground hover:bg-white/80 dark:hover:bg-gray-950/80 transition-all backdrop-blur-sm"
      >
        <ArrowUpDown size={18} className="text-muted-foreground" />
        <span>Sort</span>
        {selectedOption && (
          <span className="text-muted-foreground">: {selectedOption.label}</span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border bg-white dark:bg-gray-900 p-2 shadow-xl animate-scale-in">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'flex w-full items-center rounded-xl px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800',
                  value === option.value ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 font-medium' : 'text-foreground'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
