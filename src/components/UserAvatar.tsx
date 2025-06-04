import React from 'react';
import { Avatar } from '@mui/material';

export default function UserAvatar({
  name,
  imageUrl,
  size = 40,
}: {
  name: string;
  imageUrl?: string;
  size?: number;
}) {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : '?';

  return (
    <Avatar
      src={imageUrl}
      sx={{
        width: size,
        height: size,
        bgcolor: imageUrl ? undefined : '#1976d2',
        fontWeight: 600,
        fontSize: size / 2,
      }}
      alt={name}
    >
      {!imageUrl && initials}
    </Avatar>
  );
}
