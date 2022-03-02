import { render } from '@testing-library/react';
import DashboardHomePage from './dashboard';

describe('DashboardHomePage', () => {
  it('renders correctly', () => {
    const result = render(<DashboardHomePage />);

    expect(result).toMatchSnapshot();
  });
});
