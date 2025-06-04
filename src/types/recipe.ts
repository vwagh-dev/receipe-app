export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[]; // or string, depending on storage
  steps: string[];
  user_id: string;
  created_at: string;
  image_url?: string;
}
