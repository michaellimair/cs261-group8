import { BrowserRouter } from 'react-router-dom';
import RouterLink from './RouterLink';

describe('components/RouterLink', () => {
  it('renders properly', () => {
    const result = (
      <BrowserRouter>
        <RouterLink to="/" />
      </BrowserRouter>
    );

    expect(result).toMatchSnapshot();
  });
});
