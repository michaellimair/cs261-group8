import { render } from '@testing-library/react';
import DashboardMentorOnlyPage from './mentor-only';

describe('DashboardMentorOnlyPage', () => {
  it('renders correctly', () => {
    const result = render(<DashboardMentorOnlyPage />);

    expect(result).toMatchSnapshot();
  });
});
