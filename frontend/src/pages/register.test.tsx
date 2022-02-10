/* eslint-disable no-console */
import {
  act, fireEvent, render, RenderResult,
} from '@testing-library/react';
import { httpClient } from 'api';
import BadRequestApiError from 'api/error/BadRequestApiError';
import { IRegistration, IRegistrationError } from 'customTypes/auth';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import RegisterPage from './register';

jest.mock('api');

const tick = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

describe('register', () => {
  let queryClient: QueryClient;
  let result: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;
  let registerButton: HTMLElement;

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
          <RegisterPage />
        </BrowserRouter>
      </QueryClientProvider>,
    );
    registerButton = result.queryByTestId('registerButton')!;
    if (!registerButton) {
      throw new Error('Register button does not exist!');
    }
  });

  afterEach(() => {
    result.unmount();
  });

  it('renders properly', () => {
    expect(result).toMatchSnapshot();
  });

  it('goes to login page when login button is clicked', async () => {
    const loginButton = result.queryByTestId('login-button');
    if (!loginButton) {
      throw new Error('Login button cannot be found!');
    }
    act(() => {
      loginButton.click();
    });
    expect(window.location.pathname).toBe('/auth');
  });

  const passwordHiddenId = 'password-hidden';
  const passwordShownId = 'password-shown';

  it('defaults to not showing password', async () => {
    const passwordOffIcon = result.queryByTestId(passwordHiddenId);
    expect(passwordOffIcon).not.toBeEmptyDOMElement();
    const passwordOnIcon = result.queryByTestId(passwordShownId);
    expect(passwordOnIcon).toBeNull();
  });

  it('shows password when the show password button is clicked', async () => {
    const showPassButton = result.queryByTestId('show-password-button');
    if (!showPassButton) {
      throw new Error('Cannot find button to show password!');
    }
    act(() => {
      showPassButton.click();
    });
    let passwordOffIcon: HTMLElement | null;
    let passwordOnIcon: HTMLElement | null;

    passwordOffIcon = result.queryByTestId(passwordHiddenId);
    expect(passwordOffIcon).toBeNull();
    passwordOnIcon = result.queryByTestId(passwordShownId);
    expect(passwordOnIcon).not.toBeEmptyDOMElement();

    act(() => {
      showPassButton.click();
    });

    passwordOffIcon = result.queryByTestId(passwordHiddenId);
    expect(passwordOffIcon).not.toBeEmptyDOMElement();
    passwordOnIcon = result.queryByTestId(passwordShownId);
    expect(passwordOnIcon).toBeNull();
  });

  const fillForm = () => {
    const userData: IRegistration = {
      email: 'testuser@test.com',
      username: 'testuser',
      password: 'testuser1',
      verify_password: 'testuser1',
      first_name: 'Test',
      last_name: 'User',
    };

    Object.entries(userData).forEach(([key, value]) => {
      const inputField = result.queryByTestId(key);
      if (!inputField) {
        throw new Error(`Field ${key} does not exist!`);
      }
      fireEvent.change(inputField, { target: { value } });
    });
  };

  it('displays errors properly when there are errors in form submission', async () => {
    const err: IRegistrationError = {
      username: ['Username cannot be blank'],
      password: ['Password cannot be blank'],
      verify_password: ['Verify password cannot be blank'],
      first_name: ['First name cannot be blank'],
      last_name: ['Last name cannot be blank'],
      email: ['Email cannot be blank'],
      non_field_errors: ['Your form contains invalid inputs'],
    };

    fillForm();

    (httpClient.auth.register as jest.Mock).mockImplementationOnce(jest.fn(async () => {
      throw new BadRequestApiError<Partial<IRegistrationError>>('Bad Request Error', err);
    }));

    await act(async () => {
      registerButton.click();
      await tick(1);
    });

    expect(httpClient.auth.register).toHaveBeenCalledTimes(1);

    (httpClient.auth.register as jest.Mock).mockReset();

    // eslint-disable-next-line no-restricted-syntax
    for (const [message] of Object.values(err)) {
      // eslint-disable-next-line no-await-in-loop
      const text = await result.findByText(message);
      expect(text).toBeTruthy();
    }
  });

  it('performs registration when all form values have been filled properly', async () => {
    fillForm();

    await act(async () => {
      registerButton.click();
      await tick(1);
    });

    // Displays success message
    expect(httpClient.auth.register).toHaveBeenCalledTimes(1);
    expect(result.queryByTestId('register_success')).not.toBeEmptyDOMElement();
  });
});
