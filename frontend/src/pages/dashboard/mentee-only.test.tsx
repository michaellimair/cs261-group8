import { render } from '@testing-library/react';
import DashboardMenteeOnlyPage from './mentee-only';

describe('DashboardMenteeOnlyPage', () => {
  it('renders correctly', () => {
    const result = render(<DashboardMenteeOnlyPage />);

    expect(result).toMatchSnapshot();
  });
});
