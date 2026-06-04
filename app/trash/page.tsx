'use client';

import { Trash2 } from 'lucide-react';

export default function TrashPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-2">Trash</h1>
      <p className="text-muted-foreground mb-8">Deleted files are stored here for 30 days</p>

      <div className="rounded-2xl border bg-white p-12 text-center shadow-sm dark:bg-gray-900">
        <Trash2 className="mx-auto mb-4 size-12 text-muted-foreground" />
        <p className="text-muted-foreground">Trash is empty</p>
        <p className="text-sm text-muted-foreground mt-2">Deleted files will appear here</p>
      </div>
    </div>
  );
}
