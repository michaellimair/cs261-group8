import { render, screen } from '@testing-library/react';
import useUserDashboardRoutes from 'hooks/useUserDashboardRoutes';
import { dashboardRoutes } from 'routes';
import App from './App';

jest.mock('hooks/useUserDashboardRoutes');

describe('App', () => {
  it('renders and shows the not found page by default', () => {
    (useUserDashboardRoutes as jest.Mock).mockImplementationOnce(() => dashboardRoutes);

    render(<App />);
    const notFoundText = screen.getByText(/not_found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
