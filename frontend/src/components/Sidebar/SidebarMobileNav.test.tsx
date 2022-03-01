import { render } from '@testing-library/react';
import SidebarMobileNav from './SidebarMobileNav';

describe('SidebarMobileNav', () => {
  let onOpen: jest.Mock;

  beforeEach(() => {
    onOpen = jest.fn();
  });

  it('renders properly', () => {
    const result = render(
      <SidebarMobileNav onOpen={onOpen} />,
    );

    expect(result).toMatchSnapshot();
  });

  it('invokes the onOpen function properly', () => {
    const result = render(
      <SidebarMobileNav onOpen={onOpen} />,
    );

    const openButton = result.queryByTestId('openButton')!;

    expect(openButton).not.toBeNull();

    openButton.click();

    expect(onOpen).toHaveBeenCalledTimes(1);
  });
});
