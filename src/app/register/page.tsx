'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { updateUserProfile } from '@/services/userService';

export default function RegisterPage() {
  const { signUp, loading, user } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      setError('All fields are required.');
      return;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const { error: signUpError } = await signUp(email, password);
    if (signUpError) {
      setError(signUpError.message || 'Registration failed.');
    } else {
      // After signUp, user should be set in context
      if (user && user.id) {
        try {
          await updateUserProfile(user.id, firstName, lastName);
        } catch (err) {
          setError('Failed to save profile info.');
          return;
        }
      }
      setSuccess(true);
    }
  };

  return (
    <>
      <Box
        maxWidth={400}
        mx="auto"
        mt={8}
        p={4}
        boxShadow={2}
        borderRadius={2}
        bgcolor="background.paper"
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" mb={2} align="center">
          Register
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>Registration successful! Please check your email to verify your account.</Alert>}
        <TextField
          label="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
          inputProps={{ minLength: 6 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
        <Typography
          variant="body2"
          mt={2}
          align="center"
          sx={{ color: 'text.primary' }}
        >
          {"Already have an account? "}
          <Button
            component={require('next/link').default}
            href="/login"
            variant="text"
            color="primary"
            sx={{ textTransform: 'none', p: 0, minWidth: 0 }}
          >
            Login
          </Button>
        </Typography>
      </Box>
    </>
  );
}
