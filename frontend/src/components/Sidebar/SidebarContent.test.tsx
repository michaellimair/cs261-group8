import { render } from '@testing-library/react';
import useUserDashboardRoutes from 'hooks/useUserDashboardRoutes';
import { BrowserRouter } from 'react-router-dom';
import { dashboardRoutes } from 'routes';
import SidebarContent from './SidebarContent';

jest.mock('hooks/useUserDashboardRoutes');

describe('SidebarContent', () => {
  let onClose: jest.Mock;

  beforeEach(() => {
    onClose = jest.fn();
    (useUserDashboardRoutes as jest.Mock).mockImplementationOnce(() => dashboardRoutes);
  });

  it('renders properly', () => {
    const result = render(<BrowserRouter><SidebarContent onClose={onClose} /></BrowserRouter>);
    expect(result).toMatchSnapshot();
  });

  it('invokes onClose function when the close button is clicked', () => {
    const result = render(<BrowserRouter><SidebarContent onClose={onClose} /></BrowserRouter>);
    const closeButton = result.queryByTestId('closeButton')!;

    expect(closeButton).not.toBeNull();

    closeButton.click();

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
