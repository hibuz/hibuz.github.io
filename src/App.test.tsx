import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app title', () => {
  render(<App />);
  const linkElement = screen.getByText(/전세계 기업/i);
  expect(linkElement).toBeInTheDocument();
});
