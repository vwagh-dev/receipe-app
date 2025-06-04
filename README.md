# Recipe App

## User Table Sync (Supabase)

This project uses Supabase authentication. User IDs are managed in the `auth.users` table by Supabase Auth. For application-specific user data (such as first and last name), a separate `public.users` table is used.

### `public.users` Table Schema

| Column      | Type  | Description                        |
|-------------|-------|------------------------------------|
| id          | uuid  | Primary key, references auth.users |
| first_name  | text  | User's first name                  |
| last_name   | text  | User's last name                   |

### Automatic Sync

A database trigger ensures that whenever a new user is created in `auth.users`, a corresponding row is created in `public.users` with the same `id`. The `first_name` and `last_name` fields can be updated after registration.

### Migration

To set up the sync, run the following SQL in the Supabase SQL editor:

```sql
-- Create the public.users table with only id, first_name, last_name
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text
);

-- Function to insert into public.users when a new auth.users row is created
create or replace function public.handle_new_auth_user()
returns trigger as $$
begin
  insert into public.users (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for insert on auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_auth_user();
```

See `supabase_user_sync.sql` for the full migration script.

### Registration Flow

- When a user registers, Supabase creates a row in `auth.users`.
- The trigger automatically creates a row in `public.users` with the same `id`.
- After registration, the application should update the `first_name` and `last_name` fields in `public.users` for the new user.

### Updating User Profile

- Use the `public.users` table to store and retrieve user profile information (first/last name).
- The `id` field is always the same as the user's Supabase Auth ID.
