import { render } from '@testing-library/react';
import FeedbackFactory from 'factories/FeedbackFactory';
import { QueryRouterWrapper } from 'libs/testing';
import { useQuery } from 'react-query';
import ViewFeedbackPage from './index';

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

describe('pages/feedback/[id]', () => {
  it('returns data as usual when there are feedbacks', () => {
    const feedbackFactory = new FeedbackFactory();
    const data = feedbackFactory.createMany(10);
    (useQuery as jest.Mock).mockImplementationOnce(() => ({
      isLoading: false,
      data,
    }));

    const result = render(
      <QueryRouterWrapper>
        <ViewFeedbackPage />
      </QueryRouterWrapper>,
    );

    expect(result).toMatchSnapshot();
  });
});
