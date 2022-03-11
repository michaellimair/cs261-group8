import { render } from '@testing-library/react';
import * as hooks from 'hooks';
import useUserDashboardRoutes from 'hooks/useUserDashboardRoutes';
import { QueryRouterWrapper } from 'libs/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { dashboardRoutes } from 'routes';
import SidebarMobileNav from './SidebarMobileNav';

jest.mock('hooks');
jest.mock('hooks/useUserDashboardRoutes');

const queryClient = new QueryClient();

describe('SidebarMobileNav', () => {
  let onOpen: jest.Mock;

  beforeEach(() => {
    (useUserDashboardRoutes as jest.Mock).mockImplementationOnce(() => dashboardRoutes);
    onOpen = jest.fn();
  });

  it('renders properly', () => {
    const result = render(
      <QueryRouterWrapper>
        <QueryClientProvider client={queryClient}>
          <SidebarMobileNav onOpen={onOpen} />
        </QueryClientProvider>
      </QueryRouterWrapper>,
    );

    expect(result).toMatchSnapshot();
  });

  it('invokes the onOpen function properly', () => {
    const result = render(
      <QueryRouterWrapper>
        <QueryClientProvider client={queryClient}>
          <SidebarMobileNav onOpen={onOpen} />
        </QueryClientProvider>
      </QueryRouterWrapper>,
    );

    const openButton = result.queryByTestId('openButton')!;

    expect(openButton).not.toBeNull();

    openButton.click();

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it.skip('performs a sequence of logout actions when the logout button is pressed', () => {
    const result = render(
      <QueryClientProvider client={queryClient}>
        <SidebarMobileNav onOpen={onOpen} />
      </QueryClientProvider>,
    );

    const menuButton = result.queryByTestId('menuButton')!;
    expect(menuButton).not.toBeNull();
    menuButton.click();
    const logoutButton = result.queryByTestId('logoutButton')!;
    expect(logoutButton).not.toBeNull();

    const mockLogout = jest.fn();

    (hooks.useLogout as jest.Mock).mockImplementationOnce(() => ({
      onLogout: mockLogout,
      isLoggingOut: false,
    }));

    logoutButton.click();

    // Should perform the logout action, reauthenticate, then refresh the whole website
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
