import { render } from '@testing-library/react';
import FeedbackFactory from 'factories/FeedbackFactory';
import { QueryRouterWrapper } from 'libs/testing';
import { useQuery } from 'react-query';
import EditFeedbackPage from './edit';

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

const mockReset = jest.fn();

jest.mock('hooks/useCommonForm', () => () => ({
  onSubmit: jest.fn(),
  errors: {},
  isLoading: false,
  register: jest.fn(),
  reset: mockReset,
}));

describe('pages/feedback/[id]/edit', () => {
  it('shows edit form properly', () => {
    const feedbackFactory = new FeedbackFactory();
    const data = feedbackFactory.create();
    (useQuery as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data,
    }));

    const result = render(
      <QueryRouterWrapper>
        <EditFeedbackPage />
      </QueryRouterWrapper>,
    );

    expect(mockReset).toHaveBeenCalledTimes(1);
    expect(result).toMatchSnapshot();
  });
});
