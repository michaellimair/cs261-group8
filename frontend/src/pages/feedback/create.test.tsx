import { render } from '@testing-library/react';
import { QueryRouterWrapper } from 'libs/testing';
import CreateFeedbackPage from './create';

jest.mock('hooks/useCommonForm', () => () => ({
  onSubmit: jest.fn(),
  errors: {},
  isLoading: false,
  register: jest.fn(),
}));

describe('pages/feedback/create', () => {
  it('renders correctly', () => {
    const result = render(
      <QueryRouterWrapper>
        <CreateFeedbackPage />
      </QueryRouterWrapper>,
    );

    expect(result).toMatchSnapshot();
  });
});
