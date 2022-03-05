import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import WelcomePage from './WelcomePage';

describe('components/WelcomePage', () => {
  it('renders properly', () => {
    const result = render(
      <BrowserRouter>
        <WelcomePage />
      </BrowserRouter>,
    );

    expect(result).toMatchSnapshot();
  });
});
