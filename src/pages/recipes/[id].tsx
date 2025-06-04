import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getRecipeById } from '../../services/recipeService';
import { Recipe } from '../../types/recipe';

export default function RecipeDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;
    setLoading(true);
    getRecipeById(id)
      .then(data => {
        setRecipe(data);
        setError(null);
      })
      .catch(() => {
        setError('Failed to fetch recipe');
        setRecipe(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading recipe...</div>;
  if (error) return <div>{error}</div>;
  if (!recipe) return <div>Recipe not found.</div>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <h3>Ingredients</h3>
      <ul>
        {Array.isArray(recipe.ingredients)
          ? recipe.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)
          : <li>{recipe.ingredients}</li>}
      </ul>
      <h3>Steps</h3>
      <ol>
        {Array.isArray(recipe.steps)
          ? recipe.steps.map((step, idx) => <li key={idx}>{step}</li>)
          : <li>{recipe.steps}</li>}
      </ol>
    </div>
  );
}
