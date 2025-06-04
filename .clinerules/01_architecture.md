# Cooking Recipe Sharing App – Full Architecture

This architecture is designed for a modern, scalable recipe sharing application using **Next.js** (React-based framework) and **Material UI** for the frontend, with **Supabase** for authentication and database (PostgreSQL). The structure is modular, maintainable, and ready for team collaboration.

---

## 1. File & Folder Structure

```
/receipe-app
│
├── public/                  # Static assets (images, icons, etc.)
│
├── tests/
│   └── e2e/                 # End-to-end (E2E) tests (Playwright, Cypress, etc.)
│
├── src/
│   ├── components/          # Reusable UI components (Buttons, Cards, etc.)
│   ├── features/            # Feature-based folders (each with UI, logic, hooks)
│   │   ├── auth/            # Auth forms, hooks, logic
│   │   ├── recipes/         # Recipe CRUD, list, detail, share
│   │   └── users/           # User profile, settings
│   ├── hooks/               # Custom React hooks (e.g., useAuth, useRecipes)
│   ├── lib/                 # Supabase client, utility functions
│   ├── pages/               # Next.js pages (route-based)
│   │   ├── _app.tsx         # App entry, providers, global styles
│   │   ├── index.tsx        # Home page (feed/discover)
│   │   ├── recipes/
│   │   │   ├── index.tsx    # All recipes
│   │   │   └── [id].tsx     # Recipe detail
│   │   ├── users/
│   │   │   └── [id].tsx     # User profile
│   │   ├── login.tsx        # Login page
│   │   ├── register.tsx     # Registration page
│   │   └── ...              # Other routes (settings, etc.)
│   ├── providers/           # React context providers (Auth, Theme, etc.)
│   ├── services/            # API/service layer (Supabase queries, business logic)
│   ├── styles/              # Global and component styles (if not using CSS-in-JS)
│   └── types/               # TypeScript types/interfaces
│
├── .env.local               # Environment variables (Supabase keys, etc.)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 2. What Each Part Does

### **public/**
- Static files served as-is. Used for images, favicon, etc.

### **src/components/**
- Small, reusable UI elements (e.g., `RecipeCard`, `UserAvatar`, `Button`).
- No business logic; purely presentational.

### **src/features/**
- **auth/**: Handles login, registration, password reset, and session management UI + logic.
- **recipes/**: All recipe-related UI and logic (listing, creating, editing, viewing, sharing).
- **users/**: User profile, settings, and user-specific data.

### **src/hooks/**
- Custom React hooks for encapsulating logic (e.g., `useAuth`, `useRecipeList`, `useUser`).

### **src/lib/**
- Supabase client initialization (`supabaseClient.ts`).
- Utility functions (e.g., date formatting, helpers).

### **src/pages/**
- Next.js routing: each file = route.
- `_app.tsx`: App-wide providers (Auth, Theme, etc.).
- `index.tsx`: Home/feed page.
- `recipes/`: Recipe list and detail pages.
- `users/`: User profile pages.
- `login.tsx`, `register.tsx`: Auth pages.

### **src/providers/**
- React context providers for global state (e.g., AuthProvider, ThemeProvider).

### **src/services/**
- Functions for interacting with Supabase (CRUD for recipes, users, etc.).
- Business logic (e.g., recipe sharing, permissions).

### **src/styles/**
- Global styles, theme overrides (if not using only Material UI's theming).

### **src/types/**
- TypeScript types/interfaces for recipes, users, etc.

### **.env.local**
- Environment variables (Supabase URL, anon/public key).

---

## 3. State Management & Service Connections

### **State Management**
- **Local State**: UI state (form fields, modal open/close) managed with React's `useState` or `useReducer`.
- **Global State**: 
  - **Auth State**: Managed via React Context (`AuthProvider`), using Supabase's auth session.
  - **Theme State**: Managed via Material UI's ThemeProvider.
  - **User/Recipe Data**: Fetched on-demand via hooks (`useRecipes`, `useUser`), cached in component state or context if needed.

### **Service Connections**
- **Supabase Client**: Initialized in `src/lib/supabaseClient.ts`, imported wherever DB/auth is needed.
- **Auth**: 
  - Registration, login, logout via Supabase Auth API.
  - Session stored in context, accessible app-wide.
- **Database**:
  - CRUD operations via Supabase client in `src/services/`.
  - Recipes, users, and other entities are tables in Supabase PostgreSQL.
- **API Layer**:
  - All DB/auth logic abstracted in `src/services/` and exposed via hooks in `src/hooks/`.
  - UI components call hooks, which call services, which use Supabase client.

---

## 4. Example Data Flow

1. **User logs in**:  
   - UI calls `useAuth` hook → `authService` (Supabase) → updates AuthContext.
2. **User creates recipe**:  
   - UI form → `useCreateRecipe` hook → `recipeService.createRecipe()` → Supabase DB.
3. **Recipe list page**:  
   - UI calls `useRecipeList` hook → `recipeService.getRecipes()` → Supabase DB → returns data to UI.

---

## 5. Diagram

```mermaid
graph TD
  UI[UI Components] -->|calls| Hooks
  Hooks -->|call| Services
  Services -->|use| SupabaseClient
  SupabaseClient -->|connects| Supabase[Supabase (DB + Auth)]
  Providers --> UI
  AuthProvider --> UI
  ThemeProvider --> UI
```

---

## 6. Summary Table

| Layer         | Folder/Files                | Responsibility                        |
|---------------|----------------------------|---------------------------------------|
| UI            | `components/`, `pages/`    | Presentational, routing               |
| State         | `providers/`, `hooks/`     | Auth, theme, data fetching/caching    |
| Services      | `services/`, `lib/`        | Business logic, Supabase integration  |
| Types         | `types/`                   | TypeScript types/interfaces           |
| Static Assets | `public/`                  | Images, icons, etc.                   |
| Config        | `.env.local`               | Environment variables                 |

---

## 7. Extensibility

- Add new features by creating new folders in `features/` and corresponding hooks/services.
- Easily swap out Supabase for another backend by updating `services/` and `lib/`.
- UI is decoupled from data logic for maintainability.

---

**This architecture provides a clean separation of concerns, scalability, and a smooth developer experience for your recipe sharing app.**
