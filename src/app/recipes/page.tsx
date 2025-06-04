'use client';

import React, { useState } from 'react';
import { useRecipeList } from '../../hooks/useRecipeList';
import CreateRecipeForm from '../../components/CreateRecipeForm';
import { useAuth } from '../../hooks/useAuth';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  ButtonGroup,
  AppBar,
  Toolbar,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

export default function RecipeListPage() {
  const [refresh, setRefresh] = useState(0);
  const { recipes, loading, error } = useRecipeList(refresh);
  const { user, signOut } = useAuth();
  const userId = user?.id;
  const router = useRouter();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editIngredients, setEditIngredients] = useState('');
  const [editSteps, setEditSteps] = useState('');

  // Create form modal state
  const [createOpen, setCreateOpen] = useState(false);

  const handleDelete = async (id: string) => {
    const { deleteRecipe } = await import('../../services/recipeService');
    await deleteRecipe(id);
    setRefresh(r => r + 1);
  };

  const handleEdit = (recipe: any) => {
    setEditingId(recipe.id);
    setEditTitle(recipe.title);
    setEditDescription(recipe.description);
    setEditIngredients(Array.isArray(recipe.ingredients) ? recipe.ingredients.join('\n') : recipe.ingredients || '');
    setEditSteps(Array.isArray(recipe.steps) ? recipe.steps.join('\n') : recipe.steps || '');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
    setEditIngredients('');
    setEditSteps('');
  };

  const handleSave = async (id: string) => {
    const { updateRecipe } = await import('../../services/recipeService');
    await updateRecipe(id, {
      title: editTitle,
      description: editDescription,
      ingredients: editIngredients.split('\n').map(s => s.trim()).filter(Boolean),
      steps: editSteps.split('\n').map(s => s.trim()).filter(Boolean),
    });
    setEditingId(null);
    setRefresh(r => r + 1);
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  // When recipe is created, close modal and refresh list
  const handleCreated = () => {
    setCreateOpen(false);
    setRefresh(r => r + 1);
  };

  return (
    <Box minHeight="100vh" bgcolor="#f5f6fa">
      <AppBar position="static" color="default" elevation={1} sx={{ mb: 4 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" fontWeight={700}>
            Recipes
          </Typography>
          {userId && (
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ textTransform: 'none' }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box maxWidth={900} mx="auto" p={2}>
        {userId && (
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setCreateOpen(true)}
              sx={{ textTransform: 'none' }}
              variant="contained"
            >
              Create Recipe
            </Button>
          </Box>
        )}
        <Paper elevation={1}>
          {loading ? (
            <Typography align="center" sx={{ p: 2 }}>
              Loading recipes...
            </Typography>
          ) : error ? (
            <Typography color="error" align="center" sx={{ p: 2 }}>
              {error}
            </Typography>
          ) : recipes.length === 0 ? (
            <Typography align="center" sx={{ p: 2 }}>
              No recipes found.
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Ingredients</TableCell>
                    <TableCell>Steps</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recipes.map((recipe) => (
                    <TableRow key={recipe.id} sx={{ bgcolor: editingId === recipe.id ? '#f0f4ff' : 'inherit' }}>
                      <TableCell>
                        {editingId === recipe.id ? (
                          <TextField
                            value={editTitle}
                            onChange={e => setEditTitle(e.target.value)}
                            size="small"
                            fullWidth
                          />
                        ) : (
                          recipe.title
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === recipe.id ? (
                          <TextField
                            value={editDescription}
                            onChange={e => setEditDescription(e.target.value)}
                            size="small"
                            fullWidth
                            multiline
                            minRows={2}
                          />
                        ) : (
                          recipe.description
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === recipe.id ? (
                          <TextField
                            value={editIngredients}
                            onChange={e => setEditIngredients(e.target.value)}
                            size="small"
                            fullWidth
                            multiline
                            minRows={2}
                          />
                        ) : (
                          <ul style={{ margin: 0, paddingLeft: 20 }}>
                            {(Array.isArray(recipe.ingredients) ? recipe.ingredients : [recipe.ingredients]).map(
                              (ing, i) => (
                                <li key={i}>
                                  <Typography variant="body2">{ing}</Typography>
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === recipe.id ? (
                          <TextField
                            value={editSteps}
                            onChange={e => setEditSteps(e.target.value)}
                            size="small"
                            fullWidth
                            multiline
                            minRows={2}
                          />
                        ) : (
                          <ol style={{ margin: 0, paddingLeft: 20 }}>
                            {(Array.isArray(recipe.steps) ? recipe.steps : [recipe.steps]).map((step, i) => (
                              <li key={i}>
                                <Typography variant="body2">{step}</Typography>
                              </li>
                            ))}
                          </ol>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {editingId === recipe.id ? (
                          <ButtonGroup variant="contained" size="small">
                            <Button color="primary" startIcon={<SaveIcon />} onClick={() => handleSave(recipe.id)}>
                              Save
                            </Button>
                            <Button color="inherit" startIcon={<CancelIcon />} onClick={handleCancel}>
                              Cancel
                            </Button>
                          </ButtonGroup>
                        ) : (
                          <ButtonGroup variant="text" size="small">
                            <Button color="primary" startIcon={<EditIcon />} onClick={() => handleEdit(recipe)}>
                              Edit
                            </Button>
                            <Button color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(recipe.id)}>
                              Delete
                            </Button>
                          </ButtonGroup>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>
      <Dialog open={createOpen} onClose={() => setCreateOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Recipe</DialogTitle>
        <DialogContent>
          {userId && (
            <CreateRecipeForm userId={userId} onCreated={handleCreated} />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
