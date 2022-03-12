import { render, RenderResult } from '@testing-library/react';
import { QueryRouterWrapper } from 'libs/testing';
import { useQuery } from 'react-query';
import FeedbackFactory from 'factories/FeedbackFactory';
import { httpClient } from 'api';
import FeedbackPage from '.';

jest.mock('react-query');
jest.mock('api');

describe('pages/feedback', () => {
  const feedbackFactory = new FeedbackFactory();
  let result: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;

  beforeEach(() => {
    (useQuery as jest.Mock).mockImplementationOnce(() => ({
      isLoading: false,
      data: feedbackFactory.createMany(10),
    }));
    result = render(
      <QueryRouterWrapper>
        <FeedbackPage />
      </QueryRouterWrapper>,
    );
  });

  it('renders correctly', () => {
    expect(result).toMatchSnapshot();
  });

  it('calls the httpClient for querying', () => {
    const mutationFn = (useQuery as jest.Mock).mock.calls[0][1];

    mutationFn();

    expect(httpClient.feedback.listFeedback).toHaveBeenCalledTimes(1);
  });

  it('has the correct query id', () => {
    const mutationKey = (useQuery as jest.Mock).mock.calls[0][0];

    expect(mutationKey).toMatchObject(['feedback', 'list']);
  });
});
