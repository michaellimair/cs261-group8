import { render, RenderResult } from '@testing-library/react';
import { useUser } from 'hooks/useUser';
import useUserDashboardRoutes from 'hooks/useUserDashboardRoutes';
import { dashboardRoutes } from 'routes';
import App from './App';

jest.mock('hooks/useUser');
jest.mock('layouts/AuthLayout', () => () => null);
jest.mock('layouts/UserLayout', () => () => null);
jest.mock('pages/fallback', () => () => null);
jest.mock('hooks/useUserDashboardRoutes');

describe('App', () => {
  let result: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;

  beforeEach(() => {
    window.location.pathname = '/';
  });

  afterEach(() => {
    result.unmount();
  });

  it('renders correctly', () => {
    (useUser as jest.Mock).mockImplementationOnce(jest.fn(() => ({
      user: {},
      isLoggedIn: false,
      isLoading: false,
    })));
    (useUserDashboardRoutes as jest.Mock).mockImplementationOnce(() => dashboardRoutes);

    result = render(<App />);

    expect(result).toMatchSnapshot();
  });
});
