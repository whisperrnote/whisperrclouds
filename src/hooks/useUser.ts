import { useState, useEffect } from 'react';
import { User, UserRole, SubscriptionType } from '@/types';
import { isTokenExpired } from '@/lib';

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
          role: UserRole.USER,
          createdAt: new Date(),
          subscription: SubscriptionType.FREE
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
