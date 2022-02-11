/* eslint-disable no-console */
import {
  act, fireEvent, render, RenderResult,
} from '@testing-library/react';
import { httpClient } from 'api';
import BadRequestApiError from 'api/error/BadRequestApiError';
import { ILogin, ILoginError } from 'customTypes/auth';
import { tick } from 'libs/testing';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './login';

jest.mock('api');
describe('login', () => {
  let queryClient: QueryClient;
  let result: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;
  let loginButton: HTMLElement;

  beforeAll(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          cacheTime: Infinity,
        },
      },
    });

    setLogger({
      log: console.log,
      warn: console.warn,
      // ✅ no more errors on the console
      error: () => {},
    });
  });

  beforeEach(() => {
    result = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </QueryClientProvider>,
    );
    loginButton = result.queryByTestId('loginButton')!;
    if (!loginButton) {
      throw new Error('Login button does not exist!');
    }
  });

  afterEach(() => {
    result.unmount();
  });

  it('renders properly', () => {
    expect(result).toMatchSnapshot();
  });

  it('goes to register page when register button is clicked', async () => {
    const registerButton = result.queryByTestId('register-button');
    if (!registerButton) {
      throw new Error('Register button cannot be found!');
    }
    registerButton.click();
    expect(window.location.pathname).toBe('/auth/register');
  });

  const userData: ILogin = {
    username: 'testuser',
    password: 'testuser1',
  };

  const fillForm = () => {
    Object.entries(userData).forEach(([key, value]) => {
      const inputField = result.queryByTestId(key);
      if (!inputField) {
        throw new Error(`Field ${key} does not exist!`);
      }
      fireEvent.change(inputField, { target: { value } });
    });
  };

  it('displays errors properly when there are errors in form submission', async () => {
    const err: ILoginError = {
      username: ['Username cannot be blank'],
      password: ['Password cannot be blank'],
      non_field_errors: ['Your form contains invalid inputs'],
    };

    fillForm();

    (httpClient.auth.login as jest.Mock).mockImplementationOnce(jest.fn(async () => {
      throw new BadRequestApiError<Partial<ILoginError>>('Bad Request Error', err);
    }));

    await act(async () => {
      loginButton.click();
      await tick(1);
    });

    expect(httpClient.auth.login).toHaveBeenCalledTimes(1);

    (httpClient.auth.login as jest.Mock).mockReset();

    // eslint-disable-next-line no-restricted-syntax
    for (const [message] of Object.values(err)) {
      // eslint-disable-next-line no-await-in-loop
      const text = await result.findByText(message);
      expect(text).toBeTruthy();
    }
  });

  it('performs login when all form values have been filled properly', async () => {
    fillForm();

    await act(async () => {
      loginButton.click();
      await tick(1);
    });

    // Displays success message
    expect(httpClient.auth.login).toHaveBeenCalledTimes(1);
    expect(httpClient.auth.login).toHaveBeenCalledWith(userData);
    expect(result.queryByTestId('login_success')).not.toBeEmptyDOMElement();
  });
});
