import i18n from 'i18n';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders and shows the not found page by default', () => {
    render(<App />);
    const notFoundText = screen.getByText(/not_found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
