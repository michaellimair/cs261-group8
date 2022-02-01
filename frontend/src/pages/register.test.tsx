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
    const registerButton = await result.findByText('Login');
    registerButton.click();
    expect(window.location.pathname).toBe('/auth');
  });
});
