export interface User {
  id: string; // UUID, matches auth.users.id
  first_name: string | null;
  last_name: string | null;
}
