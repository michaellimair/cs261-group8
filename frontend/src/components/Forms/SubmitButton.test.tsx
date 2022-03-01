import { render } from '@testing-library/react';
import SubmitButton from './SubmitButton';

describe('components/Forms/SubmitButton', () => {
  it('renders correctly', async () => {
    const result = render(<SubmitButton loadingText="Loading..." testId="submit-button">hello</SubmitButton>);

    expect(result).toMatchSnapshot();

    const helloText = result.queryByText('hello');

    expect(helloText).not.toBeNull();
  });

  it('shows the loading text when disabled', () => {
    const result = render(<SubmitButton loadingText="Loading..." isLoading disabled testId="submit-button">hello</SubmitButton>);

    const loadingText = result.queryAllByText('Loading...');

    expect(loadingText).not.toHaveLength(0);
  });
});
