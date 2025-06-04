import { supabase } from '../lib/supabaseClient';
import { Recipe } from '../types/recipe';

/**
 * Fetch all recipes
 */
export async function getRecipes(): Promise<Recipe[]> {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
  return data || [];
}

/**
 * Fetch a single recipe by id
 */
export async function getRecipeById(id: string): Promise<Recipe | null> {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data;
}

/**
 * Create a new recipe
 */
export async function createRecipe(recipe: Omit<Recipe, 'id' | 'created_at'>): Promise<Recipe | null> {
  const { data, error } = await supabase
    .from('recipes')
    .insert([recipe])
    .select()
    .single();
  if (error) return null;
  return data;
}

/**
 * Update a recipe by id
 */
export async function updateRecipe(id: string, updates: Partial<Omit<Recipe, 'id' | 'created_at'>>): Promise<Recipe | null> {
  const { data, error } = await supabase
    .from('recipes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) return null;
  return data;
}

/**
 * Delete a recipe by id
 */
export async function deleteRecipe(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('recipes')
    .delete()
    .eq('id', id);
  return !error;
}
