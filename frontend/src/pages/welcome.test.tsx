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
import { setLogger } from 'react-query';
import { useUser } from 'hooks/useUser';
import useCommonForm from 'hooks/useCommonForm';
import useBusinessAreaOptions from 'hooks/useBusinessAreaOptions';
import useTimezoneOptions from 'hooks/useTimezoneOptions';
import useCountries from 'hooks/useCountries';
import useSkillsOptions from 'hooks/useSkillsOptions';
import useLanguages from 'hooks/useLanguages';
import { useFieldArray } from 'react-hook-form';
import useGroupOptions from 'hooks/useGroupOptions';
import WelcomeForm from './welcome';

const mockCommonForm = {
  onSubmit: jest.fn(),
  errors: {},
  isLoading: false,
  register: jest.fn(),
  watch: jest.fn(),
  setValue: jest.fn(),
  control: {},
};

jest.mock('hooks/useUser');
jest.mock('hooks/useBusinessAreaOptions');
jest.mock('hooks/useCountries');
jest.mock('hooks/useSkillsOptions');
jest.mock('hooks/useTimezoneOptions');
jest.mock('hooks/useLanguages');
jest.mock('hooks/useGroupOptions');
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useFieldArray: jest.fn(),
}));

jest.mock('react-query');
jest.mock('api');
jest.mock('hooks/useCommonForm', () => jest.fn().mockImplementation(() => mockCommonForm));
describe('welcome', () => {
  let result: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;
  let submitButton: HTMLElement;

  beforeAll(() => {
    setLogger({
      log: console.log,
      warn: console.warn,
      // ✅ no more errors on the console
      error: () => {},
    });
  });

  beforeEach(() => {
    (useCommonForm as jest.Mock).mockImplementation(() => mockCommonForm);
    (useBusinessAreaOptions as jest.Mock).mockImplementation(() => ([
      {
        label: '',
        value: '',
      },
    ]));
    (useFieldArray as jest.Mock).mockImplementation(jest.fn().mockImplementation(() => ({
      fields: [],
      append: jest.fn(),
      remove: jest.fn(),
    })));
    (useCountries as jest.Mock).mockImplementation(() => ([
      {
        value: 'CU',
        label: 'Cuba',
      },
    ]));
    (useTimezoneOptions as jest.Mock).mockImplementation(() => ([
      {
        label: 'Europe/London',
        value: 'GMT',
      },
    ]));
    (useLanguages as jest.Mock).mockImplementation(() => ([{
      code: 'id',
      name: 'Indonesian',
    }]));
    (useGroupOptions as jest.Mock).mockImplementation(() => ([{
      id: 1,
      name: 'mentor',
    }]));
    (useSkillsOptions as jest.Mock).mockImplementation(() => ({
      options: ([
        {
          label: 'Python',
          value: 'Python',
        },
      ]),
      isFetching: false,
    }));
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
      groups: ['groups cannot be blank'],
      completed: ['completed cannot be blank'],
      pronoun: ['pronoun cannot be blank'],
      years_experience: ['years_experience cannot be blank'],
      title: ['title cannot be blank'],
      country: ['country cannot be blank'],
      timezone: ['timezone cannot be blank'],
      skills: ['skills cannot be blank'],
      interests: ['interests cannot be blank'],
      languages: ['languages cannot be blank'],
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
