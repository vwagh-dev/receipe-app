'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, CardActions, Grid } from '@mui/material';
import { searchMeals } from '../../services/themealdbService';

export default function TheMealDBSearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const meals = await searchMeals(query);
      setResults(meals);
    } catch (err: any) {
      setError(err.message || 'Failed to search meals');
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <Box maxWidth={800} mx="auto" mt={6} p={2}>
      <Typography variant="h4" align="center" gutterBottom>
        Search Recipes (TheMealDB)
      </Typography>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, marginBottom: 24, justifyContent: 'center' }}>
        <TextField
          label="Search for a recipe"
          value={query}
          onChange={e => setQuery(e.target.value)}
          size="small"
          sx={{ minWidth: 300 }}
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </form>
      {error && <Typography color="error" align="center">{error}</Typography>}
      <Grid container spacing={2}>
        {results.map(meal => (
          <Grid item xs={12} sm={6} md={4} key={meal.idMeal}>
            <Card>
              <CardContent>
                <Typography variant="h6">{meal.strMeal}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {meal.strArea} | {meal.strCategory}
                </Typography>
                {meal.strMealThumb && (
                  <Box mt={2} textAlign="center">
                    <img src={meal.strMealThumb} alt={meal.strMeal} style={{ maxWidth: '100%', borderRadius: 8 }} />
                  </Box>
                )}
              </CardContent>
              <CardActions>
                <Button size="small" href={`/themealdb-search/${meal.idMeal}`}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {results.length === 0 && !loading && (
        <Typography align="center" color="text.secondary" mt={4}>
          No results found.
        </Typography>
      )}
    </Box>
  );
}
