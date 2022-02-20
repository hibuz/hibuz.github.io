import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import App from './App';

test('renders datagrid value', async () => {
  render(<App />);
  await waitFor(() => {
    const linkElement = screen.getByText(/애플/i);
    expect(linkElement).toBeInTheDocument();
  });
});
