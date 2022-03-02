import { render } from '@testing-library/react';
import {
  FiBell,
} from 'react-icons/fi';
import SidebarNavItem from './SidebarNavItem';

describe('SidebarNavItem', () => {
  it('renders properly without an icon', () => {
    const result = render(
      <SidebarNavItem>
        hello
      </SidebarNavItem>,
    );

    expect(result).toMatchSnapshot();
    expect(result.queryByTestId('sidebarNavIcon')).toBeNull();
  });

  it('renders properly with an icon', () => {
    const result = render(
      <SidebarNavItem icon={FiBell}>
        hello
      </SidebarNavItem>,
    );

    expect(result.queryByTestId('sidebarNavIcon')).not.toBeNull();
  });
});
