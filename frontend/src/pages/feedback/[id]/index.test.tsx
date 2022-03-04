import { render, RenderResult } from '@testing-library/react';
import { httpClient } from 'api';
import { IFeedback } from 'customTypes/feedback';
import FeedbackFactory from 'factories/FeedbackFactory';
import { QueryRouterWrapper } from 'libs/testing';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ViewFeedbackPage from './index';

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));
jest.mock('api');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useParams: jest.fn(),
}));

describe('pages/feedback/[id]', () => {
  const feedbackFactory = new FeedbackFactory();
  let feedback: IFeedback;
  let result: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;

  beforeEach(() => {
    feedback = feedbackFactory.create();
    (useParams as jest.Mock).mockImplementation(() => ({ id: feedback.id }));
    (useQuery as jest.Mock).mockImplementationOnce(() => ({
      isLoading: false,
      data: feedback,
    }));

    result = render(
      <QueryRouterWrapper>
        <ViewFeedbackPage />
      </QueryRouterWrapper>,
    );
  });

  it('returns data as usual when there are feedbacks', () => {
    expect(result).toMatchSnapshot();
  });

  it('calls the httpClient to obtain data by id', () => {
    const queryFn = (useQuery as jest.Mock).mock.calls[0][1];

    queryFn();

    expect(httpClient.feedback.getFeedback).toHaveBeenCalledWith(feedback.id);
  });

  it('does not fail to render if there is no data', () => {
    (useQuery as jest.Mock).mockImplementationOnce(() => ({
      isLoading: true,
    }));

    expect(() => render(
      <QueryRouterWrapper>
        <ViewFeedbackPage />
      </QueryRouterWrapper>,
    )).not.toThrow();
  });
});
