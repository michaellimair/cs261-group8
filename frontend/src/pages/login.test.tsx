import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './login';

describe('login', () => {
  it('renders properly', () => {
    const result = render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );
    expect(result).toMatchSnapshot();
  });

  it('goes to register page properly', async () => {
    const result = render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );
    const registerButton = result.queryByTestId('register-button');
    if (!registerButton) {
      throw new Error('Register button cannot be found!');
    }
    registerButton.click();
    expect(window.location.pathname).toBe('/auth/register');
  });
});
