"use client";

import { useState } from 'react';
import FileExplorer from '@/components/dashboard/FileExplorer';
import StorageStats from '@/components/dashboard/StorageStats';
import UploadModal from '@/components/dashboard/UploadModal';
import { useUser } from '@/hooks/useUser';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

export default function DashboardPage() {
  const { user } = useUser();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  if (!user) {
    return <div className="container mx-auto p-4">Loading user data...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">My Files</h1>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="btn-primary flex items-center"
        >
          <span>Upload Files</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Files</TabsTrigger>
              <TabsTrigger value="recent">Recently Accessed</TabsTrigger>
              <TabsTrigger value="starred">Starred</TabsTrigger>
              <TabsTrigger value="shared">Shared</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <FileExplorer />
            </TabsContent>
            <TabsContent value="recent">
              <FileExplorer filter="recent" />
            </TabsContent>
            <TabsContent value="starred">
              <FileExplorer filter="starred" />
            </TabsContent>
            <TabsContent value="shared">
              <FileExplorer filter="shared" />
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <StorageStats />
        </div>
      </div>

      {isUploadModalOpen && (
        <UploadModal 
          onClose={() => setIsUploadModalOpen(false)}
        />
      )}
    </div>
  );
}
