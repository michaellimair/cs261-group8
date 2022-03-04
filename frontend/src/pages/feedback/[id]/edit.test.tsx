import { render, RenderResult } from '@testing-library/react';
import { httpClient } from 'api';
import { IFeedback, IFeedbackDTO } from 'customTypes/feedback';
import FeedbackFactory from 'factories/FeedbackFactory';
import useCommonForm from 'hooks/useCommonForm';
import { QueryRouterWrapper } from 'libs/testing';
import { pick } from 'lodash';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import EditFeedbackPage from './edit';

const mockCommonForm = {
  onSubmit: jest.fn(),
  errors: {},
  isLoading: false,
  register: jest.fn(),
  reset: jest.fn(),
};

const mockUseNavigate = jest.fn();

jest.mock('api');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockUseNavigate,
  useParams: jest.fn(),
}));

jest.mock('hooks/useCommonForm', () => jest.fn().mockImplementation(() => mockCommonForm));

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

describe('pages/feedback/[id]/edit', () => {
  let feedback: IFeedback;
  const feedbackFactory = new FeedbackFactory();
  let result: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;

  beforeEach(() => {
    feedback = feedbackFactory.create();
    (useQuery as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: feedback,
    }));
    (useCommonForm as jest.Mock).mockImplementation(() => mockCommonForm);
    (useParams as jest.Mock).mockImplementation(() => ({ id: feedback.id }));
    result = render(
      <QueryRouterWrapper>
        <EditFeedbackPage />
      </QueryRouterWrapper>,
    );
  });

  it('shows edit form properly', () => {
    expect(mockCommonForm.reset).toHaveBeenCalledTimes(1);
    expect(result).toMatchSnapshot();
  });

  it('does not reset form if data is loading', () => {
    mockCommonForm.reset.mockClear();
    (useQuery as jest.Mock).mockImplementation(() => ({
      isLoading: true,
    }));
    result = render(
      <QueryRouterWrapper>
        <EditFeedbackPage />
      </QueryRouterWrapper>,
    );
    expect(mockCommonForm.reset).toHaveBeenCalledTimes(0);
  });

  it('calls the navigate function after onSuccess', () => {
    const { onSuccess } = (useCommonForm as jest.Mock).mock.calls[0][0];

    const id = 2;

    onSuccess({ id });

    expect(mockUseNavigate).toHaveBeenCalledWith('../feedbacks/2');
  });

  it('performs an initial query to obtain the initial data', () => {
    const queryFn = (useQuery as jest.Mock).mock.calls[0][1];

    queryFn();

    expect(httpClient.feedback.getFeedback).toHaveBeenCalledWith(feedback.id);
  });

  it('calls the feedback http client for mutation', () => {
    const otherFeedback = feedbackFactory.create();
    const otherFeedbackDTO: Partial<IFeedbackDTO> = pick(otherFeedback, ['content', 'title', 'type']);

    const { mutationFn } = (useCommonForm as jest.Mock).mock.calls[0][0];

    mutationFn(otherFeedbackDTO);

    expect(httpClient.feedback.updateFeedback).toHaveBeenCalledWith(feedback.id, otherFeedbackDTO);
  });

  it('has the correct mutation id signature', () => {
    const { mutationId } = (useCommonForm as jest.Mock).mock.calls[0][0];

    expect(mutationId).toMatchObject(['feedback', feedback.id, 'update']);
  });
});
