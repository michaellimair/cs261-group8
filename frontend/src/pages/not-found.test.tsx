import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from './not-found';

describe('not-found', () => {
  it('renders properly', async () => {
    const result = render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    );
    expect(await result.findByText('Page Not Found')).toBeTruthy();
    expect(result).toMatchSnapshot();
  });
});
