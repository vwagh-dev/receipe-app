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

-- Create public.recipes table for Recipe CRUD
create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  ingredients text[] not null,
  steps text[] not null,
  user_id uuid references public.users(id) on delete cascade,
  created_at timestamp with time zone default now()
);

-- Add image_url column if it does not exist
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_name='recipes' and column_name='image_url'
  ) then
    alter table public.recipes add column image_url text;
  end if;
end $$;
