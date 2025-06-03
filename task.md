# Cooking Recipe Sharing App – MVP Task List

This is a granular, step-by-step plan to build the MVP, based on the project architecture and coding policy. Each task is atomic, testable, and focused on a single concern.

---

## 1. Project Setup

1. **Initialize Next.js Project** ✅ (DONE)

   - Start: No project files exist.
   - End: Next.js app scaffolded with TypeScript.

2. **Install Dependencies**

   - Start: Scaffolded app.
   - End: Material UI, Supabase JS client, Jest, React Testing Library, Cypress/Playwright installed.

3. **Set Up Linting & Formatting** ✅ (DONE)
   - Start: No lint/format config.
   - End: ESLint and Prettier configured.

---

## 2. Core Configuration

4. **Create .env.local for Supabase**

   - Start: No env file.
   - End: `.env.local` with Supabase URL and anon key.

5. **Initialize Supabase Client**

   - Start: No Supabase client.
   - End: `src/lib/supabaseClient.ts` exports configured client.

6. **Set Up Global Providers**
   - Start: Default `_app.tsx`.
   - End: `_app.tsx` wraps app with ThemeProvider and AuthProvider.

---

## 3. Auth Feature

7. **Create Auth Context & Provider**

   - Start: No auth context.
   - End: `src/providers/AuthProvider.tsx` with context, session state, and methods.

8. **Implement useAuth Hook**

   - Start: No hook.
   - End: `src/hooks/useAuth.ts` exposes auth state and actions.

9. **Build Registration Page**

   - Start: No register page.
   - End: `src/pages/register.tsx` with form, validation, and Supabase signup.

10. **Build Login Page**

    - Start: No login page.
    - End: `src/pages/login.tsx` with form, validation, and Supabase signin.

11. **Add Auth Unit Tests**
    - Start: No tests.
    - End: Tests for AuthProvider and useAuth.

---

## 4. Recipe Feature

12. **Define Recipe Type**

    - Start: No type.
    - End: `src/types/recipe.ts` with Recipe interface.

13. **Create Recipe Service**

    - Start: No service.
    - End: `src/services/recipeService.ts` with CRUD functions.

14. **Implement useRecipeList Hook**

    - Start: No hook.
    - End: `src/hooks/useRecipeList.ts` fetches recipes.

15. **Build Recipe List Page**

    - Start: No list page.
    - End: `src/pages/recipes/index.tsx` displays recipes.

16. **Build Recipe Detail Page**

    - Start: No detail page.
    - End: `src/pages/recipes/[id].tsx` shows recipe details.

17. **Build Create Recipe Form**

    - Start: No form.
    - End: Component for adding a recipe, integrated with service.

18. **Add Recipe Unit Tests**
    - Start: No tests.
    - End: Tests for recipe service and hooks.

---

## 5. User Feature

19. **Define User Type**

    - Start: No type.
    - End: `src/types/user.ts` with User interface.

20. **Create User Service**

    - Start: No service.
    - End: `src/services/userService.ts` with user fetch/update.

21. **Implement useUser Hook**

    - Start: No hook.
    - End: `src/hooks/useUser.ts` fetches user data.

22. **Build User Profile Page**

    - Start: No profile page.
    - End: `src/pages/users/[id].tsx` shows user info.

23. **Add User Unit Tests**
    - Start: No tests.
    - End: Tests for user service and hooks.

---

## 6. UI Components

24. **Create RecipeCard Component**

    - Start: No component.
    - End: `src/components/RecipeCard.tsx` displays recipe summary.

25. **Create UserAvatar Component**

    - Start: No component.
    - End: `src/components/UserAvatar.tsx` displays user avatar.

26. **Add Component Unit Tests**
    - Start: No tests.
    - End: Tests for RecipeCard and UserAvatar.

---

## 7. E2E & Integration

27. **Write E2E Test: Registration/Login**

    - Start: No E2E.
    - End: Cypress/Playwright test for user registration and login.

28. **Write E2E Test: Recipe CRUD**

    - Start: No E2E.
    - End: Test for creating, viewing, and listing recipes.

29. **Write E2E Test: User Profile**
    - Start: No E2E.
    - End: Test for viewing user profile.

---

## 8. Polish & Docs

30. **Add Global Styles**

    - Start: No global styles.
    - End: `src/styles/` with base theme and overrides.

31. **Update README**
    - Start: Default README.
    - End: Project setup, scripts, and test instructions documented.

---

Each task is atomic, testable, and focused on a single concern, enabling efficient handoff and validation between steps.

---

32. **Run Playwright E2E Tests & Ensure Passing**

    - Start: Tests may fail.
    - End: All Playwright E2E tests pass. ✅ (DONE)
