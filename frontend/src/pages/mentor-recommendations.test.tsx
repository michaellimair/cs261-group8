/* eslint-disable no-console */
import { render, RenderResult } from '@testing-library/react';
import { QueryRouterWrapper } from 'libs/testing';
import { setLogger, useMutation, useQuery } from 'react-query';
import MentorRecommendationsPage from './mentor-recommendations';

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  setLogger: jest.fn(),
}));

describe('mentor-recommendations', () => {
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
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: [],
      isLoading: false,
    }));
    (useMutation as jest.Mock).mockImplementation(() => ({
      mutateAsync: jest.fn(),
      isLoading: false,
    }));
    result = render(
      <QueryRouterWrapper>
        <MentorRecommendationsPage />
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
    expect(result).toMatchSnapshot();
  });
});
