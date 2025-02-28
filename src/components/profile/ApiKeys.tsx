import { useState } from 'react';
import { ApiKey } from '@/types';

export default function ApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;
    
    // In a real app, you'd call an API to create the key
    const newKey: ApiKey = {
      id: `key_${Math.random().toString(36).substr(2, 9)}`,
      name: newKeyName,
      prefix: `whc_${Math.random().toString(36).substr(2, 6)}`,
      createdAt: new Date(),
      permissions: ['read'],
      userId: 'user_123'
    };
    
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setIsCreating(false);
  };

  const handleDeleteKey = (id: string) => {
    // In a real app, you'd call an API to delete the key
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">API Keys</h2>
        <button 
          onClick={() => setIsCreating(true)}
          className="btn-primary"
        >
          Create API Key
        </button>
      </div>
      
      {isCreating && (
        <div className="mb-6 p-4 border rounded-lg">
          <h3 className="text-lg font-medium mb-2">Create New API Key</h3>
          <div className="mb-4">
            <label className="block mb-1">Key Name</label>
            <input
              type="text"
              value={newKeyName}
              onChange={e => setNewKeyName(e.target.value)}
              placeholder="e.g., Development Key"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleCreateKey}
              className="btn-primary"
              disabled={!newKeyName.trim()}
            >
              Create Key
            </button>
            <button 
              onClick={() => setIsCreating(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {apiKeys.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No API keys created yet.</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Key</th>
                <th className="px-4 py-2 text-left">Created</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map(key => (
                <tr key={key.id} className="border-t">
                  <td className="px-4 py-3">{key.name}</td>
                  <td className="px-4 py-3">{key.prefix}•••••••••••</td>
                  <td className="px-4 py-3">{key.createdAt.toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <button 
                      onClick={() => handleDeleteKey(key.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <p className="mt-4 text-sm text-gray-500">
        API keys grant full access to your account. Keep them secure!
      </p>
    </div>
  );
}
