jest.mock('../../lib/supabaseClient', () => ({
  supabase: {},
}));

import { renderHook, act, waitFor } from '@testing-library/react';
import * as userService from '../../services/userService';
import { useUser } from '../useUser';

jest.mock('../../services/userService');

const mockUser = {
  id: 'test-id',
  first_name: 'John',
  last_name: 'Doe',
};

describe('useUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches user by id', async () => {
    (userService.getUserById as jest.Mock).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useUser('test-id'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.error).toBeNull();
    expect(userService.getUserById).toHaveBeenCalledWith('test-id');
  });

  it('handles fetch error', async () => {
    (userService.getUserById as jest.Mock).mockRejectedValue(new Error('fail'));

    const { result } = renderHook(() => useUser('bad-id'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.error).toBe('Failed to fetch user');
  });

  it('updates user profile', async () => {
    (userService.getUserById as jest.Mock).mockResolvedValue(mockUser);
    (userService.updateUserProfile as jest.Mock).mockResolvedValue({
      ...mockUser,
      first_name: 'Jane',
      last_name: 'Smith',
    });

    const { result } = renderHook(() => useUser('test-id'));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      const updated = await result.current.updateProfile('Jane', 'Smith');
      expect(updated).toEqual({
        ...mockUser,
        first_name: 'Jane',
        last_name: 'Smith',
      });
    });

    expect(result.current.user).toEqual({
      ...mockUser,
      first_name: 'Jane',
      last_name: 'Smith',
    });
    expect(result.current.error).toBeNull();
  });

  it('handles update error', async () => {
    (userService.getUserById as jest.Mock).mockResolvedValue(mockUser);
    (userService.updateUserProfile as jest.Mock).mockRejectedValue(new Error('fail'));

    const { result } = renderHook(() => useUser('test-id'));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      const updated = await result.current.updateProfile('Jane', 'Smith');
      expect(updated).toBeNull();
    });

    expect(result.current.error).toBe('Failed to update user');
  });
});
