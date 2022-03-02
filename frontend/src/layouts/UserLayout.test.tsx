import { render } from '@testing-library/react';
import UserLayout from './UserLayout';

describe('UserLayout', () => {
  it('renders properly', () => {
    const result = render(<UserLayout />);
    expect(result).toMatchSnapshot();
  });
});
