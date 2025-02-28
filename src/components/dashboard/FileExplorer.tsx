import { useState } from 'react';
import { useFiles } from '@/hooks';
import { FileItem } from '@/types';

interface FileExplorerProps {
  filter?: string;
}

export default function FileExplorer({ filter = 'all' }: FileExplorerProps) {
  const { files, isLoading } = useFiles();
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  // Simple file filtering based on the selected tab
  const filteredFiles = files.filter(file => {
    if (filter === 'all') return true;
    if (filter === 'recent' && file.lastAccessed) {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return file.lastAccessed > oneWeekAgo;
    }
    if (filter === 'starred') return file.isStarred;
    if (filter === 'shared') return file.isShared;
    return true;
  });

  if (isLoading) {
    return <div className="p-8 text-center">Loading files...</div>;
  }

  if (filteredFiles.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No files found</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4">
      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Name</th>
            <th className="text-left py-2">Last Modified</th>
            <th className="text-left py-2">Size</th>
            <th className="text-left py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* This would normally use real file data */}
          <tr className="border-b hover:bg-gray-50">
            <td className="py-3">Example Document.pdf</td>
            <td className="py-3">Today, 2:30 PM</td>
            <td className="py-3">2.1 MB</td>
            <td className="py-3">
              <button className="text-blue-500 mr-2">View</button>
              <button className="text-red-500">Delete</button>
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="py-3">Project Presentation.pptx</td>
            <td className="py-3">Yesterday</td>
            <td className="py-3">5.7 MB</td>
            <td className="py-3">
              <button className="text-blue-500 mr-2">View</button>
              <button className="text-red-500">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
