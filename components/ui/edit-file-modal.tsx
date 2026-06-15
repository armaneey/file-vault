'use client';

import { useState } from 'react';
import { X, Save } from 'lucide-react';
import { cn } from '@/lib';

interface EditFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  fileDescription?: string;
  onSave: (name: string, description: string) => void;
}

export function EditFileModal({ isOpen, onClose, fileName, fileDescription, onSave }: EditFileModalProps) {
  const [name, setName] = useState(fileName);
  const [description, setDescription] = useState(fileDescription || '');

  if (!isOpen) return null;

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim(), description.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-50 w-full max-w-md rounded-2xl border bg-white p-4 sm:p-6 shadow-2xl dark:bg-gray-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X className="size-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">
            Edit File
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            Update file name and description
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label htmlFor="fileName" className="mb-2 block text-xs sm:text-sm font-medium text-foreground">
              File Name
            </label>
            <input
              id="fileName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:border-gray-700 dark:bg-gray-800"
              placeholder="Enter file name"
            />
          </div>

          <div>
            <label htmlFor="fileDescription" className="mb-2 block text-xs sm:text-sm font-medium text-foreground">
              Description (optional)
            </label>
            <textarea
              id="fileDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:border-gray-700 dark:bg-gray-800 resize-none"
              placeholder="Enter file description"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-300 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-foreground hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white hover:from-purple-700 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="size-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
