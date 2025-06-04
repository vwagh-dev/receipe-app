import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Recipe } from '../types/recipe';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Card variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {recipe.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {recipe.description}
        </Typography>
        <Box sx={{ mt: 1, mb: 1 }}>
          <Typography variant="subtitle2">Ingredients:</Typography>
          {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
              {recipe.ingredients.map((ing, i) => (
                <Chip key={i} label={ing} size="small" />
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">None</Typography>
          )}
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2">Steps:</Typography>
          {Array.isArray(recipe.steps) && recipe.steps.length > 0 ? (
            <ol style={{ margin: 0, paddingLeft: 20 }}>
              {recipe.steps.map((step, i) => (
                <li key={i}>
                  <Typography variant="body2">{step}</Typography>
                </li>
              ))}
            </ol>
          ) : (
            <Typography variant="body2" color="text.secondary">None</Typography>
          )}
        </Box>
        {recipe.image_url && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <img src={recipe.image_url} alt={recipe.title} style={{ maxWidth: '100%', borderRadius: 8 }} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
