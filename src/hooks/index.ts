import { useState, useEffect } from 'react';
import { User, FileItem, StorageQuota } from '@/types';
import { authenticateUser, fetchUserFiles } from '@/services';
import { isTokenExpired } from '@/lib';

// User authentication hook
export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        // In a real app, you'd fetch the user from Appwrite or session
        const token = localStorage.getItem('auth_token');
        if (!token || isTokenExpired(token)) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        // Mock user for development
        setUser({
          id: 'user_123',
          email: 'user@example.com',
          name: 'Demo User',
          role: 'user' as any,
          createdAt: new Date(),
          subscription: 'free' as any
        });
      } catch (err) {
        setError('Failed to load user');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  return { user, isLoading, error, setUser };
}

// Files management hook
export function useFiles(folderId?: string) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    async function loadFiles() {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const userFiles = await fetchUserFiles(user.id, folderId);
        setFiles(userFiles);
      } catch (err) {
        setError('Failed to load files');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadFiles();
  }, [user, folderId]);

  return { files, isLoading, error, setFiles };
}

// Storage quota hook
export function useStorageQuota() {
  const [quota, setQuota] = useState<StorageQuota>({
    total: 5 * 1024 * 1024 * 1024, // 5GB
    used: 0,
    remaining: 5 * 1024 * 1024 * 1024,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    async function loadQuota() {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // In a real app, you'd fetch this from Appwrite
        const mockUsed = Math.random() * 2 * 1024 * 1024 * 1024; // Random usage up to 2GB
        setQuota({
          total: 5 * 1024 * 1024 * 1024, // 5GB
          used: mockUsed,
          remaining: 5 * 1024 * 1024 * 1024 - mockUsed,
        });
      } catch (err) {
        console.error('Failed to load storage quota:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadQuota();
  }, [user]);

  return { quota, isLoading };
}

// Web3 wallet connection hook
export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('No Ethereum wallet found');
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAddress(accounts[0]);
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  return { address, isConnecting, error, connectWallet };
}