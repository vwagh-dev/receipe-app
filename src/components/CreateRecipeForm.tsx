import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Paper,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { createRecipe } from '../services/recipeService';

export default function CreateRecipeForm({ userId, onCreated }: { userId: string, onCreated?: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [steps, setSteps] = useState<string[]>(['']);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleIngredientChange = (idx: number, value: string) => {
    setIngredients(ings => ings.map((ing, i) => (i === idx ? value : ing)));
  };

  const handleStepChange = (idx: number, value: string) => {
    setSteps(sts => sts.map((step, i) => (i === idx ? value : step)));
  };

  const addIngredient = () => setIngredients([...ingredients, '']);
  const removeIngredient = (idx: number) => setIngredients(ings => ings.filter((_, i) => i !== idx));
  const addStep = () => setSteps([...steps, '']);
  const removeStep = (idx: number) => setSteps(sts => sts.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!title || !description || ingredients.some(i => !i) || steps.some(s => !s)) {
      setError('Title, description, ingredients, and steps are required.');
      return;
    }

    setLoading(true);
    const recipe = {
      title,
      description,
      ingredients: ingredients.filter(Boolean),
      steps: steps.filter(Boolean),
      user_id: userId,
      image_url: imageUrl,
    };
    const result = await createRecipe(recipe as any);
    setLoading(false);

    if (result) {
      setSuccess(true);
      setTitle('');
      setDescription('');
      setIngredients(['']);
      setSteps(['']);
      setImageUrl('');
      if (onCreated) onCreated();
    } else {
      setError('Failed to create recipe.');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" align="center" mb={3}>
          Create New Recipe
        </Typography>
        {error && <Typography color="error" mb={2}>{error}</Typography>}
        {success && <Typography color="success.main" mb={2}>Recipe created!</Typography>}
        <TextField
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          fullWidth
          multiline
          minRows={2}
          sx={{ mb: 2 }}
        />
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Ingredients
        </Typography>
        {ingredients.map((ing, idx) => (
          <Box key={idx} display="flex" alignItems="center" sx={{ mb: 1 }}>
            <TextField
              value={ing}
              onChange={e => handleIngredientChange(idx, e.target.value)}
              placeholder={`Ingredient ${idx + 1}`}
              fullWidth
              sx={{ mr: 1 }}
            />
            {ingredients.length > 1 && (
              <IconButton onClick={() => removeIngredient(idx)} size="small" color="error">
                <RemoveIcon />
              </IconButton>
            )}
          </Box>
        ))}
        <Button
          onClick={addIngredient}
          startIcon={<AddIcon />}
          size="small"
          sx={{ mb: 2, textTransform: 'none' }}
        >
          Add Ingredient
        </Button>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Steps
        </Typography>
        {steps.map((step, idx) => (
          <Box key={idx} display="flex" alignItems="center" sx={{ mb: 1 }}>
            <TextField
              value={step}
              onChange={e => handleStepChange(idx, e.target.value)}
              placeholder={`Step ${idx + 1}`}
              fullWidth
              sx={{ mr: 1 }}
            />
            {steps.length > 1 && (
              <IconButton onClick={() => removeStep(idx)} size="small" color="error">
                <RemoveIcon />
              </IconButton>
            )}
          </Box>
        ))}
        <Button
          onClick={addStep}
          startIcon={<AddIcon />}
          size="small"
          sx={{ mb: 2, textTransform: 'none' }}
        >
          Add Step
        </Button>
        <TextField
          label="Image URL"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          fullWidth
          sx={{ mb: 3, mt: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 2, py: 1.5, fontWeight: 600, fontSize: 18 }}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Recipe'}
        </Button>
      </form>
    </Paper>
  );
}
