import { render } from '@testing-library/react';
import AuthLayout from './AuthLayout';

describe('AuthLayout', () => {
  it('renders properly', () => {
    const result = render(<AuthLayout />);
    expect(result).toMatchSnapshot();
  });
});
