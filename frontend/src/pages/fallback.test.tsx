import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from './fallback';

describe('fallback', () => {
  it('renders properly', async () => {
    const result = render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    );
    expect(result).toMatchSnapshot();
  });
});
