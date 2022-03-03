import { render } from '@testing-library/react';
import {
  FiBell,
} from 'react-icons/fi';
import { BrowserRouter } from 'react-router-dom';
import { dashboardRoutes } from 'routes';
import SidebarNavItem from './SidebarNavItem';

describe('SidebarNavItem', () => {
  it('renders properly without an icon', () => {
    const result = render(
      <BrowserRouter>
        <SidebarNavItem route={dashboardRoutes[0]}>
          hello
        </SidebarNavItem>

      </BrowserRouter>,
    );

    expect(result).toMatchSnapshot();
    expect(result.queryByTestId('sidebarNavIcon')).toBeNull();
  });

  it('renders properly with an icon', () => {
    const result = render(
      <BrowserRouter>
        <SidebarNavItem icon={FiBell} route={dashboardRoutes[0]}>
          hello
        </SidebarNavItem>

      </BrowserRouter>,
    );

    expect(result.queryByTestId('sidebarNavIcon')).not.toBeNull();
  });
});
