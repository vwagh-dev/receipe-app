# Coding Policy – TDD, Unit Tests, and E2E

This document outlines the coding and testing practices for this project, with a focus on Test-Driven Development (TDD), comprehensive unit testing, and end-to-end (E2E) testing.

---

## 1. Testing Philosophy

- **Test-Driven Development (TDD):**  
  All new features and bug fixes must be developed using TDD. Write tests before implementation.
- **Test Coverage:**  
  Strive for high coverage, especially for business logic and critical paths.

---

## 2. Types of Tests

- **Unit Tests:**  
  - Test individual functions, hooks, and components in isolation.
  - Use [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for React components.
- **Integration Tests:**  
  - Test interactions between modules (e.g., hooks + services, component + API).
- **End-to-End (E2E) Tests:**  
  - Use [Cypress](https://www.cypress.io/) or [Playwright](https://playwright.dev/).
  - Simulate real user flows (registration, login, recipe CRUD, sharing, etc.).

---

## 3. Test Organization

- Place unit/integration tests alongside source files as `*.test.ts(x)` or in a `__tests__/` subfolder.
- E2E tests live in `/e2e/` or `/tests/e2e/` at the project root.

---

## 4. CI Integration

- All tests must pass before merging to `main`.
- Use GitHub Actions or similar for automated test runs on pull requests.

---

## 5. Mocking & Isolation

- Mock Supabase and external services in unit/integration tests.
- Use a test database or Supabase's test mode for E2E.

---

## 6. Best Practices

- Write clear, descriptive test names.
- Prefer testing behavior over implementation details.
- Refactor tests as code evolves.
- Keep tests fast and deterministic.

---

## 7. Playwright Test Enforcement Policy

- Always check that `npx playwright test` passes without error.
- If there are errors, review code changes, fix issues, and rerun the tests.
- This fix-and-rerun loop must be executed at least 3 times if there are test failures.

---

## 8. Sample Tools

- **Unit/Integration:** Jest, React Testing Library
- **E2E:** Cypress or Playwright

---

**By following these practices, the project will maintain high code quality, reliability, and developer confidence.**
