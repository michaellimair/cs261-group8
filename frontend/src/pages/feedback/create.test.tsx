import { render, RenderResult } from '@testing-library/react';
import useCommonForm from 'hooks/useCommonForm';
import { QueryRouterWrapper } from 'libs/testing';
import { httpClient } from 'api';
import FeedbackFactory from 'factories/FeedbackFactory';
import { IFeedbackDTO } from 'customTypes/feedback';
import { pick } from 'lodash';
import CreateFeedbackPage from './create';

const mockCommonForm = {
  onSubmit: jest.fn(),
  errors: {},
  isLoading: false,
  register: jest.fn(),
};

const mockUseNavigate = jest.fn();

jest.mock('api');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockUseNavigate,
}));

jest.mock('hooks/useCommonForm', () => jest.fn().mockImplementation(() => mockCommonForm));

describe('pages/feedback/create', () => {
  let result: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;

  beforeEach(() => {
    (useCommonForm as jest.Mock).mockImplementation(() => mockCommonForm);
    result = render(
      <QueryRouterWrapper>
        <CreateFeedbackPage />
      </QueryRouterWrapper>,
    );
  });

  it('renders correctly', () => {
    expect(result).toMatchSnapshot();
  });

  it('calls the navigate function after onSuccess', () => {
    const { onSuccess } = (useCommonForm as jest.Mock).mock.calls[0][0];

    const id = 2;

    onSuccess({ id });

    expect(mockUseNavigate).toHaveBeenCalledWith('../feedbacks/2');
  });

  it('calls the feedback http client for mutation', () => {
    const feedbackFactory = new FeedbackFactory();
    const feedback = feedbackFactory.create();
    const feedbackDTO: IFeedbackDTO = pick(feedback, ['content', 'title', 'type']);

    const { mutationFn } = (useCommonForm as jest.Mock).mock.calls[0][0];

    mutationFn(feedbackDTO);

    expect(httpClient.feedback.createFeedback).toHaveBeenCalledWith(feedbackDTO);
  });

  it('has the correct mutation id signature', () => {
    const { mutationId } = (useCommonForm as jest.Mock).mock.calls[0][0];

    expect(mutationId).toMatchObject(['feedback', 'create']);
  });
});
