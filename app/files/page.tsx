export const dynamic = 'force-dynamic';
import { listFiles } from '../actions/storage';
import { FileList } from '@/components/dashboard';

export default async function FilesPage() {
  const files = await listFiles();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">My Files</h1>
      <p className="text-muted-foreground mb-8">
        Manage all your uploaded files
      </p>

      <FileList
        files={files}
        isLoading={false}
        emptyMessage="No files uploaded yet"
      />
    </div>
  );
}