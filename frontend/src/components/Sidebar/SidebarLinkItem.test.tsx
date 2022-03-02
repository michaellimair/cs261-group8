import { render } from '@testing-library/react';
import SidebarLinkItem from './SidebarLinkItem';

describe('SidebarLinkItem', () => {
  let onClose: jest.Mock;

  beforeEach(() => {
    onClose = jest.fn();
  });

  it('renders properly', () => {
    const result = render(<SidebarLinkItem onClose={onClose} />);
    expect(result).toMatchSnapshot();
  });

  it('invokes onClose function when the close button is clicked', () => {
    const result = render(<SidebarLinkItem onClose={onClose} />);
    const closeButton = result.queryByTestId('closeButton')!;

    expect(closeButton).not.toBeNull();

    closeButton.click();

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
