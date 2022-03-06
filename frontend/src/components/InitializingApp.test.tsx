import { render } from '@testing-library/react';
import InitializingApp from './InitializingApp';

describe('components/InitializingApp', () => {
  it('renders properly', () => {
    const result = render(
      <InitializingApp />,
    );

    expect(result).toMatchSnapshot();
  });
});
