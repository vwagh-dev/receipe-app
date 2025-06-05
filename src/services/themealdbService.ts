const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function searchMeals(query: string) {
  const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to fetch meals');
  const data = await res.json();
  return data.meals || [];
}

export async function getMealById(id: string) {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error('Failed to fetch meal');
  const data = await res.json();
  return data.meals && data.meals[0] ? data.meals[0] : null;
}
