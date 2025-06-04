import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthProvider';

// Mock supabase client
jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } }
      })),
      signInWithPassword: jest.fn().mockResolvedValue({ error: null }),
      signUp: jest.fn().mockResolvedValue({ error: null }),
      signOut: jest.fn().mockResolvedValue({ error: null }),
    },
  },
}));

function TestComponent() {
  const { user, session, loading, signIn, signUp, signOut } = useAuth();
  return (
    <div>
      <div>user: {user ? 'yes' : 'no'}</div>
      <div>session: {session ? 'yes' : 'no'}</div>
      <div>loading: {loading ? 'yes' : 'no'}</div>
      <button onClick={() => signIn('test@example.com', 'password')}>Sign In</button>
      <button onClick={() => signUp('test@example.com', 'password')}>Sign Up</button>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}

describe('AuthProvider', () => {
  it('provides default context values', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByText(/user:/)).toHaveTextContent('user: no');
    expect(screen.getByText(/session:/)).toHaveTextContent('session: no');
    // loading will be false after initial effect
    await waitFor(() => expect(screen.getByText(/loading:/)).toHaveTextContent('loading: no'));
  });

  it('calls signIn, signUp, and signOut without error', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    screen.getByText('Sign In').click();
    screen.getByText('Sign Up').click();
    screen.getByText('Sign Out').click();
    // No errors should be thrown
  });
});
