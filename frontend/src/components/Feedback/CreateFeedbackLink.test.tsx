import { render } from '@testing-library/react';
import { QueryRouterWrapper } from 'libs/testing';
import CreateFeedbackLink from './CreateFeedbackLink';

describe('components/Feedback/CreateFeedbackLink', () => {
  it('renders correctly', () => {
    const result = render(<QueryRouterWrapper><CreateFeedbackLink /></QueryRouterWrapper>);

    expect(result).toMatchSnapshot();
  });
});
