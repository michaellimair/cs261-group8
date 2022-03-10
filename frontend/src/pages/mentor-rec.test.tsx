import { QueryRouterWrapper } from 'libs/testing';
import { render, RenderResult } from '@testing-library/react';
import { QueryClient, setLogger, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import MentorRec from './mentor-rec';

describe('mentor-rec', () => {
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
    result = render(
      <BrowserRouter>
        <MentorRec />
      </BrowserRouter>,
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
