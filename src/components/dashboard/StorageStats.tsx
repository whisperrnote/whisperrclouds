import { useStorageQuota } from '@/hooks';

export default function StorageStats() {
  const { quota, isLoading } = useStorageQuota();
  
  if (isLoading) {
    return <div className="p-4 border rounded-lg">Loading storage data...</div>;
  }

  // Calculate percentage used
  const usedPercentage = (quota.used / quota.total) * 100;
  
  // Format bytes to human readable format
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-4">Storage Usage</h2>
      
      <div className="mb-2 flex justify-between">
        <span>Used: {formatBytes(quota.used)}</span>
        <span>Total: {formatBytes(quota.total)}</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${usedPercentage}%` }}
        ></div>
      </div>
      
      <p className="text-sm mt-2 text-gray-500">
        {formatBytes(quota.remaining)} available
      </p>
      
      <button className="btn-outline w-full mt-4">
        Upgrade Storage
      </button>
    </div>
  );
}
