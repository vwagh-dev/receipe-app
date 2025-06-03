import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '@/components/LoginForm';

// Mock useAuth
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    signIn: jest.fn(async (email, password) => {
      if (email === 'fail@example.com') {
        return { error: { message: 'Login failed.' } };
      }
      return { error: null };
    }),
    loading: false,
  }),
}));

describe('LoginForm', () => {
  function Wrapper() {
    return (
      <div>
        <h4>Login</h4>
        <LoginForm />
      </div>
    );
  }

  it('renders login form', () => {
    render(<Wrapper />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows validation errors', async () => {
    const { container } = render(<Wrapper />);
    const form = container.querySelector('form');
    fireEvent.submit(form!);
    let errorNode;
    try {
      errorNode = await screen.findByText((content) =>
        /email and password are required/i.test(content)
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(screen.debug());
      throw e;
    }
    expect(errorNode).toBeInTheDocument();

    // Reset fields for next validation
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '' } });

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    // Assertion for "valid email address" error removed as per user request

    // Reset fields for next validation
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '' } });

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(await screen.findByText(/at least 6 characters/i)).toBeInTheDocument();
  });

  it('shows error on failed login', async () => {
    render(<Wrapper />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'fail@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(await screen.findByText(/login failed/i)).toBeInTheDocument();
  });

  it('shows success on successful login', async () => {
    render(<Wrapper />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(await screen.findByText(/login successful/i)).toBeInTheDocument();
  });
});
