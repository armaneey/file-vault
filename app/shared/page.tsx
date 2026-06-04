'use client';

import { Share2 } from 'lucide-react';

export default function SharedPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-2">Shared Files</h1>
      <p className="text-muted-foreground mb-8">Files shared with you and by you</p>

      <div className="rounded-2xl border bg-white p-12 text-center shadow-sm dark:bg-gray-900">
        <Share2 className="mx-auto mb-4 size-12 text-muted-foreground" />
        <p className="text-muted-foreground">No shared files yet</p>
        <p className="text-sm text-muted-foreground mt-2">Share files with others to see them here</p>
      </div>
    </div>
  );
}
