# Cooking Recipe Sharing App – MVP Task List

This is a granular, step-by-step plan to build the MVP, based on the project architecture and coding policy. Each task is atomic, testable, and focused on a single concern.

---

## 1. Project Setup

1. **Initialize Next.js Project (with TypeScript)** ✅ (DONE)

   - Start: No project files exist.
   - End: Next.js app scaffolded with TypeScript (TypeScript setup included).

2. **Install Dependencies**

   - Start: Scaffolded app.
   - End: Material UI, Supabase JS client, Jest, React Testing Library, Cypress/Playwright installed.

3. **Set Up Linting & Formatting** ✅ (DONE)
   - Start: No lint/format config.
   - End: ESLint and Prettier configured.

---

## 2. Core Configuration

4. **Create .env.local for Supabase** ✅ (DONE)

   - Start: No env file.
   - End: `.env.local` with Supabase URL and anon key.

5. **Initialize Supabase Client** ✅ (DONE)

   - Start: No Supabase client.
   - End: `src/lib/supabaseClient.ts` exports configured client.

6. **Set Up Global Providers** ✅ (DONE)
   - Start: Default `_app.tsx`.
   - End: `_app.tsx` wraps app with ThemeProvider and AuthProvider.

---

## 3. Auth Feature

7. **Create Auth Context & Provider** ✅ (DONE)

   - Start: No auth context.
   - End: `src/providers/AuthProvider.tsx` with context, session state, and methods.

8. **Implement useAuth Hook** ✅ (DONE)

   - Start: No hook.
   - End: `src/hooks/useAuth.ts` exposes auth state and actions.

9. **Build Registration Page** ✅ (DONE)

   - Start: No register page.
   - End: `src/pages/register.tsx` with form, validation, and Supabase signup.

10. **Build Login Page** ✅ (DONE)

    - Start: No login page.
    - End: `src/pages/login.tsx` with form, validation, and Supabase signin.

11. **Add Auth Unit Tests** ✅ (DONE)
    - Start: No tests.
    - End: Tests for AuthProvider and useAuth.

12. **Protecting Routes** ✅ (DONE)
    - Start: All routes accessible.
    - End: ProtectedRoute component implemented, routes require authentication.

---

## 4. User Feature

13. **Define User Type**

    - Start: No type.
    - End: `src/types/user.ts` with User interface.

14. **Create User Service**

    - Start: No service.
    - End: `src/services/userService.ts` with user fetch/update.

15. **Implement useUser Hook**

    - Start: No hook.
    - End: `src/hooks/useUser.ts` fetches user data.

16. **Build User Profile Page**

    - Start: No profile page.
    - End: `src/pages/users/[id].tsx` shows user info.

17. **Add User Unit Tests**
    - Start: No tests.
    - End: Tests for user service and hooks.

---

## 5. Sync DB users (auth.users and public.users)

18. **Create public.users table and sync triggers** ✅ (DONE)

    - Start: Only auth.users exists.
    - End: public.users table exists, triggers keep it in sync with auth.users.

19. **Update registration flow to store first/last name** ✅ (DONE)

    - Start: Registration only stores email/password.
    - End: Registration also stores first/last name in public.users.

20. **Update user service and hooks for new schema** ✅ (DONE)

    - Start: User service/hooks may not use new schema.
    - End: User service/hooks use id, first_name, last_name.

---

## 6. Recipe Feature

21. **Define Recipe Type** ✅ (DONE)

    - Start: No type.
    - End: `src/types/recipe.ts` with Recipe interface.

22. **Create Recipe Service** ✅ (DONE)

    - Start: No service.
    - End: `src/services/recipeService.ts` with CRUD functions.

23. **Implement useRecipeList Hook** ✅ (DONE)

    - Start: No hook.
    - End: `src/hooks/useRecipeList.ts` fetches recipes.

24. **Build Recipe List Page** ✅ (DONE)

    - Start: No list page.
    - End: `src/pages/recipes/index.tsx` displays recipes.

25. **Build Recipe Detail Page** ✅ (DONE)

    - Start: No detail page.
    - End: `src/pages/recipes/[id].tsx` shows recipe details.

26. **Build Create Recipe Form** ✅ (DONE)

    - Start: No form.
    - End: Component for adding a recipe, integrated with service.

27. **Add Recipe Unit Tests** ✅ (DONE)
    - Start: No tests.
    - End: Tests for recipe service and hooks.

---

## 7. UI Components

28. **Create RecipeCard Component** ✅ (DONE)

    - Start: No component.
    - End: `src/components/RecipeCard.tsx` displays recipe summary.

29. **Create UserAvatar Component** ✅ (DONE)

    - Start: No component.
    - End: `src/components/UserAvatar.tsx` displays user avatar.

30. **Add Component Unit Tests** ✅ (DONE)
    - Start: No tests.
    - End: Tests for RecipeCard and UserAvatar.

---

## 8. E2E & Integration

31. **Write E2E Test: Registration/Login** ✅ (DONE)

    - Start: No E2E.
    - End: Cypress/Playwright test for user registration and login.

32. **Write E2E Test: Recipe CRUD** ✅ (DONE)

    - Start: No E2E.
    - End: Test for creating, viewing, and listing recipes.

33. **Write E2E Test: User Profile** ✅ (DONE)
    - Start: No E2E.
    - End: Test for viewing user profile.

---

## 9. Polish & Docs

34. **Add Global Styles**

    - Start: No global styles.
    - End: `src/styles/` with base theme and overrides.

35. **Update README**
    - Start: Default README.
    - End: Project setup, scripts, and test instructions documented.

---

Each task is atomic, testable, and focused on a single concern, enabling efficient handoff and validation between steps.

---

## 10. TheMealDB Integration

37. **Integrate TheMealDB API Client** ✅ (DONE)

    - Start: No TheMealDB integration.
    - End: API client for TheMealDB is implemented (search, get recipe by id).

38. **Build Recipe Search UI (TheMealDB)** ✅ (DONE)

    - Start: No search UI.
    - End: UI to search recipes from TheMealDB and display results.

39. **Show Recipe Details from TheMealDB** ✅ (DONE)

    - Start: No details UI.
    - End: UI to view full recipe details from TheMealDB search results.

40. **Import TheMealDB Recipe as New Recipe** ✅ (DONE)

    - Start: No import option.
    - End: User can import a TheMealDB recipe as a new recipe in the app.

41. **Add Unit & Integration Tests for TheMealDB Integration** ✅ (DONE)

    - Start: No tests.
    - End: Tests for API client, search, import, and UI.

---

36. **Run Playwright E2E Tests & Ensure Passing**

    - Start: Tests may fail.
    - End: All Playwright E2E tests pass. ✅ (DONE)
