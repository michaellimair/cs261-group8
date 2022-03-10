/* eslint-disable jest/no-disabled-tests */
/* eslint-disable no-console */
import {
  act, fireEvent, render, RenderResult,
} from '@testing-library/react';
import { httpClient } from 'api';
import BadRequestApiError from 'api/error/BadRequestApiError';
import { QueryRouterWrapper, tick } from 'libs/testing';
import {
  IWelcomeError, UserGroup,
} from 'customTypes/auth';
import { QueryClient, setLogger } from 'react-query';
import { useUser } from 'hooks/useUser';
import useCommonForm from 'hooks/useCommonForm';
import WelcomeForm from './welcome';

const mockCommonForm = {
  onSubmit: jest.fn(),
  errors: {},
  isLoading: false,
  register: jest.fn(),
};

jest.mock('hooks/useUser');
jest.mock('react-query');
jest.mock('api');
jest.mock('hooks/useCommonForm', () => jest.fn().mockImplementation(() => mockCommonForm));
describe('welcome', () => {
  let queryClient: QueryClient;
  let result: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;
  let submitButton: HTMLElement;

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
    (useCommonForm as jest.Mock).mockImplementation(() => mockCommonForm);
    result = render(
      <QueryRouterWrapper>
        <WelcomeForm />
      </QueryRouterWrapper>,
    );
    submitButton = result.queryByTestId('submitButton')!;
    if (!submitButton) {
      throw new Error('Submit button does not exist!');
    }
  });

  afterEach(() => {
    result.unmount();
  });

  it('renders properly', () => {
    (useUser as jest.Mock).mockImplementationOnce(() => ({
      user: {
        groups: [{ name: UserGroup.MENTEE }],
      },
    }));
    expect(result).toMatchSnapshot();
  });

  const userData = {
    pronoun: 'they/them',
    years_experience: 5,
    country: 'Cuba',
    timezone: 'Europe/London',
    skills: ['skill 1', 'skill 2'],
    business_area_id: 5,
    title: 'anlst',
  };

  const fillForm = () => {
    Object.entries(userData).forEach(([key, value]) => {
      const inputField = result.queryByTestId(key);
      if (!inputField) {
        throw new Error(`Field "${key}" does not exist!`);
      }
      fireEvent.change(inputField, { target: { value } });
    });
  };

  it.skip('displays errors properly when there are errors in form submission', async () => {
    const err: IWelcomeError = {
      completed: ['completed cannot be blank'],
      pronoun: ['pronoun cannot be blank'],
      years_experience: ['years_experience cannot be blank'],
      title: ['title cannot be blank'],
      country: ['country cannot be blank'],
      timezone: ['timezone cannot be blank'],
      skills: ['skills cannot be blank'],
      business_area_id: ['business_area_id cannot be blank'],
      non_field_errors: ['Your form contains invalid inputs'],
      avatar: ['avatar cannot be blank'],
    };

    fillForm();

    (httpClient.profile.updateProfile as jest.Mock).mockImplementationOnce(jest.fn(async () => {
      throw new BadRequestApiError<Partial<IWelcomeError>>('Bad Request Error', err);
    }));

    await act(async () => {
      submitButton.click();
      await tick(1);
    });

    expect(httpClient.profile.updateProfile).toHaveBeenCalledTimes(1);

    (httpClient.profile.updateProfile as jest.Mock).mockReset();

    // eslint-disable-next-line no-restricted-syntax
    for (const [message] of Object.values(err)) {
      // eslint-disable-next-line no-await-in-loop
      const text = await result.findByText(message);
      expect(text).toBeTruthy();
    }
  });
});
