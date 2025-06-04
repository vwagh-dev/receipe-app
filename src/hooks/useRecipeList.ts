import { useEffect, useState } from 'react';
import { Recipe } from '../types/recipe';
import { getRecipes } from '../services/recipeService';

export function useRecipeList(refresh?: any) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getRecipes()
      .then(data => {
        setRecipes(data);
        setError(null);
      })
      .catch(err => {
        setError('Failed to fetch recipes');
        setRecipes([]);
      })
      .finally(() => setLoading(false));
  }, [refresh]);

  return { recipes, loading, error };
}
