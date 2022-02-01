import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders and shows the not found page by default', () => {
    render(<App />);
    const notFoundText = screen.getByText(/Not Found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
