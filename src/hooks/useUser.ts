import { useState, useEffect, useCallback } from 'react';
import { User } from '../types/user';
import { getUserById, updateUserProfile } from '../services/userService';

export function useUser(id: string | null) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(!!id);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setUser(null);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    getUserById(id)
      .then((data) => {
        setUser(data);
        setError(null);
      })
      .catch((err) => {
        setError('Failed to fetch user');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const updateProfile = useCallback(
    async (first_name: string, last_name: string) => {
      if (!id) return null;
      setLoading(true);
      setError(null);
      try {
        const updated = await updateUserProfile(id, first_name, last_name);
        setUser(updated);
        return updated;
      } catch (err) {
        setError('Failed to update user');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  return { user, loading, error, updateProfile };
}
