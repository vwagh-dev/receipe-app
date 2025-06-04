import { supabase } from '../lib/supabaseClient';
import { User } from '../types/user';

/**
 * Fetch a user by id from public.users
 */
export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('id, first_name, last_name')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  return data;
}

/**
 * Update first_name and last_name for a user in public.users
 */
export async function updateUserProfile(
  id: string,
  first_name: string,
  last_name: string
): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .update({ first_name, last_name })
    .eq('id', id)
    .select('id, first_name, last_name')
    .single();

  if (error) {
    console.error('Error updating user profile:', error);
    return null;
  }
  return data;
}
