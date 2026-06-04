'use client';

import { FileType } from '@/types/file';
import { Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface FilterDropdownProps {
  selectedTypes: FileType[];
  onTypeChange: (types: FileType[]) => void;
  className?: string;
}

const FILE_TYPES: { value: FileType; label: string; color: string }[] = [
  { value: 'image', label: 'Images', color: 'bg-purple-600' },
  { value: 'pdf', label: 'PDFs', color: 'bg-red-600' },
  { value: 'document', label: 'Documents', color: 'bg-blue-600' },
  { value: 'video', label: 'Videos', color: 'bg-green-600' },
  { value: 'audio', label: 'Audio', color: 'bg-yellow-600' },
  { value: 'archive', label: 'Archives', color: 'bg-orange-600' },
  { value: 'other', label: 'Other', color: 'bg-gray-600' },
];

export function FilterDropdown({ selectedTypes, onTypeChange, className }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleType = (type: FileType) => {
    if (selectedTypes.includes(type)) {
      onTypeChange(selectedTypes.filter((t) => t !== type));
    } else {
      onTypeChange([...selectedTypes, type]);
    }
  };

  const clearFilters = () => {
    onTypeChange([]);
  };

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-2xl border bg-white/50 dark:bg-gray-950/50 px-4 py-3 text-sm text-foreground hover:bg-white/80 dark:hover:bg-gray-950/80 transition-all backdrop-blur-sm"
      >
        <Filter size={18} className={selectedTypes.length > 0 ? 'text-purple-600' : 'text-muted-foreground'} />
        <span>Filter</span>
        {selectedTypes.length > 0 && (
          <span className="flex size-5 items-center justify-center rounded-full bg-purple-600 px-1.5 text-xs text-white">
            {selectedTypes.length}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border bg-white dark:bg-gray-900 p-4 shadow-xl animate-scale-in">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Filter by Type</h3>
              {selectedTypes.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={14} />
                  Clear
                </button>
              )}
            </div>

            <div className="space-y-2">
              {FILE_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => toggleType(type.value)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"  >
                  <div
                    className={cn(
                      'size-4 rounded-full transition-colors',
                      selectedTypes.includes(type.value) ? type.color : 'bg-gray-300 dark:bg-gray-700'
                    )}/>
                  <span className={selectedTypes.includes(type.value) ? 'font-medium text-foreground' : 'text-muted-foreground'}>
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
