import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterPage from './register';

describe('register', () => {
  it('renders properly', () => {
    const result = render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>,
    );
    expect(result).toMatchSnapshot();
  });

  it('goes to login page when login button is clicked', async () => {
    const result = render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>,
    );
    const loginButton = result.queryByTestId('login-button');
    if (!loginButton) {
      throw new Error('Login button cannot be found!');
    }
    loginButton.click();
    expect(window.location.pathname).toBe('/auth');
  });

  it('defaults to not showing password', async () => {
    const result = render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>,
    );
    const passwordOffIcon = result.queryByTestId('password-hidden');
    expect(passwordOffIcon).not.toBeEmptyDOMElement();
    const passwordOnIcon = result.queryByTestId('password-shown');
    expect(passwordOnIcon).toBeNull();
  });

  it('shows password when the show password button is clicked', async () => {
    const result = render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>,
    );
    const showPassButton = result.queryByTestId('show-password-button');
    if (!showPassButton) {
      throw new Error('Cannot find button to show password!');
    }
    showPassButton.click();
    let passwordOffIcon: HTMLElement | null;
    let passwordOnIcon: HTMLElement | null;

    passwordOffIcon = result.queryByTestId('password-hidden');
    expect(passwordOffIcon).toBeNull();
    passwordOnIcon = result.queryByTestId('password-shown');
    expect(passwordOnIcon).not.toBeEmptyDOMElement();

    showPassButton.click();

    passwordOffIcon = result.queryByTestId('password-hidden');
    expect(passwordOffIcon).not.toBeEmptyDOMElement();
    passwordOnIcon = result.queryByTestId('password-shown');
    expect(passwordOnIcon).toBeNull();
  });
});
