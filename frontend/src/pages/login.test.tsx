import { render, fireEvent } from '@testing-library/react';
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

  const tick = (ms: number) => new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

  it('submits login details properly', async () => {
    const result = render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );
    const loginButton = result.queryByTestId('login-button');
    const usernameField = result.queryByTestId('email-field');
    const passwordField = result.queryByTestId('password-field');
    if (!loginButton || !usernameField || !passwordField) {
      throw new Error('Login button cannot be found!');
    }
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    usernameField.focus();
    fireEvent.change(usernameField, { target: { value: 'email@test.com' } });
    fireEvent.change(passwordField, { target: { value: 'password123' } });
    loginButton.click();
    await tick(3500);
    expect(mockAlert).toHaveBeenCalledWith('{\n  \"email\": \"email@test.com\",\n  \"password\": \"password123\"\n}');
  });
});
