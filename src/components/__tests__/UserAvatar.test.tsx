import React from 'react';
import { render, screen } from '@testing-library/react';
import UserAvatar from '../UserAvatar';

describe('UserAvatar', () => {
  it('renders initials when no image', () => {
    render(<UserAvatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
    // Should NOT find an element with alt text when no imageUrl
    expect(screen.queryByAltText('John Doe')).not.toBeInTheDocument();
  });

  it('renders image when imageUrl is provided', () => {
    render(<UserAvatar name="Jane Smith" imageUrl="https://example.com/avatar.jpg" />);
    const avatar = screen.getByAltText('Jane Smith');
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(avatar).toHaveAttribute('alt', 'Jane Smith');
  });

  it('renders single initial for single name', () => {
    render(<UserAvatar name="Alice" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });
});
