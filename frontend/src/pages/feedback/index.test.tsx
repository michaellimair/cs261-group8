import { render } from '@testing-library/react';
import { QueryRouterWrapper } from 'libs/testing';
import { useQuery } from 'react-query';
import FeedbackFactory from 'factories/FeedbackFactory';
import FeedbackPage from '.';

jest.mock('react-query');

describe('pages/feedback', () => {
  it('renders correctly', () => {
    const feedbackFactory = new FeedbackFactory();
    (useQuery as jest.Mock).mockImplementationOnce(() => ({
      isLoading: false,
      data: feedbackFactory.createMany(10),
    }));
    const result = render(
      <QueryRouterWrapper>
        <FeedbackPage />
      </QueryRouterWrapper>,
    );

    expect(result).toMatchSnapshot();
  });
});
