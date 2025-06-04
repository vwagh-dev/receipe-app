import * as recipeService from '../recipeService';

const chainMock = {
  select: jest.fn().mockReturnThis(),
  order: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  single: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
};

jest.mock('../../lib/supabaseClient', () => ({
  supabase: {
    from: jest.fn(() => chainMock),
  },
}));

describe('recipeService', () => {
  beforeEach(() => {
    Object.values(chainMock).forEach(fn => {
      if (typeof fn === 'function') (fn as jest.Mock).mockReset();
    });
  });

  it('getRecipes returns data', async () => {
    const mockData = [{ id: '1', title: 'Test', description: '', ingredients: [], steps: [], user_id: 'u', created_at: '' }];
    chainMock.select.mockReturnThis();
    chainMock.order.mockResolvedValue({ data: mockData, error: null });
    const data = await recipeService.getRecipes();
    expect(data).toEqual(mockData);
  });

  it('getRecipeById returns recipe', async () => {
    const mockRecipe = { id: '1', title: 'Test', description: '', ingredients: [], steps: [], user_id: 'u', created_at: '' };
    chainMock.select.mockReturnThis();
    chainMock.eq.mockReturnThis();
    chainMock.single.mockResolvedValue({ data: mockRecipe, error: null });
    const data = await recipeService.getRecipeById('1');
    expect(data).toEqual(mockRecipe);
  });

  it('createRecipe returns new recipe', async () => {
    const mockRecipe = { id: '1', title: 'Test', description: '', ingredients: [], steps: [], user_id: 'u', created_at: '' };
    chainMock.insert.mockReturnThis();
    chainMock.select.mockReturnThis();
    chainMock.single.mockResolvedValue({ data: mockRecipe, error: null });
    const data = await recipeService.createRecipe({ title: 'Test', description: '', ingredients: [], steps: [], user_id: 'u' });
    expect(data).toEqual(mockRecipe);
  });

  it('updateRecipe returns updated recipe', async () => {
    const mockRecipe = { id: '1', title: 'Updated', description: '', ingredients: [], steps: [], user_id: 'u', created_at: '' };
    chainMock.update.mockReturnThis();
    chainMock.eq.mockReturnThis();
    chainMock.select.mockReturnThis();
    chainMock.single.mockResolvedValue({ data: mockRecipe, error: null });
    const data = await recipeService.updateRecipe('1', { title: 'Updated' });
    expect(data).toEqual(mockRecipe);
  });

  it('deleteRecipe returns true on success', async () => {
    chainMock.delete.mockReturnThis();
    chainMock.eq.mockResolvedValue({ error: null });
    const result = await recipeService.deleteRecipe('1');
    expect(result).toBe(true);
  });
});
