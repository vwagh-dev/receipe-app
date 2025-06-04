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
