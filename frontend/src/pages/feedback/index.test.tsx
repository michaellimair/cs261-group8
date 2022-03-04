import { render } from '@testing-library/react';
import { queryClient } from 'libs/query-client';
import { QueryClientProvider } from 'react-query';
import FeedbackPage from '.';

describe('pages/feedback', () => {
  it('renders correctly', () => {
    const result = render(
      <QueryClientProvider client={queryClient}>
        <FeedbackPage />
      </QueryClientProvider>,
    );

    expect(result).toMatchSnapshot();
  });
});
