jest.mock('../../lib/supabaseClient', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
    })),
  },
}));
jest.mock('../../services/recipeService');
import { renderHook, waitFor } from '@testing-library/react';
import * as recipeService from '../../services/recipeService';
import { useRecipeList } from '../useRecipeList';

const mockRecipes = [
  { id: '1', title: 'Test', description: '', ingredients: [], steps: [], user_id: 'u', created_at: '' },
];

describe('useRecipeList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches recipes successfully', async () => {
    (recipeService.getRecipes as jest.Mock).mockResolvedValue(mockRecipes);

    const { result } = renderHook(() => useRecipeList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.recipes).toEqual(mockRecipes);
    expect(result.current.error).toBeNull();
  });

  it('handles fetch error', async () => {
    (recipeService.getRecipes as jest.Mock).mockRejectedValue(new Error('fail'));

    const { result } = renderHook(() => useRecipeList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.recipes).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch recipes');
  });
});
