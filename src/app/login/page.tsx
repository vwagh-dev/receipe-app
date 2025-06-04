'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
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
    </Box>
  );
}
