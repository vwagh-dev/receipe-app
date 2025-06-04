'use client';

import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { LoginForm } from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <Box
      maxWidth={400}
      mx="auto"
      mt={8}
      p={4}
      boxShadow={2}
      borderRadius={2}
      bgcolor="background.paper"
    >
      <Typography variant="h4" mb={2} align="center">
        Login
      </Typography>
      <LoginForm />
      <Typography
        variant="body2"
        mt={2}
        align="center"
        sx={{ color: 'text.primary' }}
      >
        {"Don't have an account? "}
        <MuiLink component={Link} href="/register" underline="hover" color="primary">
          Sign up
        </MuiLink>
      </Typography>
    </Box>
  );
}
