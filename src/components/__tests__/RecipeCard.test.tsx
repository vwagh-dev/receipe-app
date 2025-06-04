import React from 'react';
import { render, screen } from '@testing-library/react';
import RecipeCard from '../RecipeCard';
import { Recipe } from '../../types/recipe';

const mockRecipe: Recipe = {
  id: '1',
  title: 'Test Recipe',
  description: 'A test recipe',
  ingredients: ['Eggs', 'Flour'],
  steps: ['Mix', 'Cook'],
  user_id: 'u1',
  created_at: '',
  image_url: 'https://example.com/image.jpg',
};

describe('RecipeCard', () => {
  it('renders recipe title, description, ingredients, steps, and image', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    // Use getAllByText for duplicate text
    expect(screen.getAllByText(/Test Recipe/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/A test recipe/i)).toBeInTheDocument();
    expect(screen.getByText(/Eggs/i)).toBeInTheDocument();
    expect(screen.getByText(/Flour/i)).toBeInTheDocument();
    expect(screen.getByText(/Mix/i)).toBeInTheDocument();
    expect(screen.getByText(/Cook/i)).toBeInTheDocument();
    // Query image by alt text
    expect(screen.getByAltText('Test Recipe')).toHaveAttribute('src', mockRecipe.image_url);
  });

  it('renders without image', () => {
    const recipeNoImage = { ...mockRecipe, image_url: undefined };
    render(<RecipeCard recipe={recipeNoImage} />);
    expect(screen.queryByAltText('Test Recipe')).not.toBeInTheDocument();
  });
});
