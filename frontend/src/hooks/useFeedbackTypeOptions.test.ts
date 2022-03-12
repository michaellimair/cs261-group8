import { renderHook } from '@testing-library/react-hooks';
import useFeedbackTypeOptions from './useFeedbackTypeOptions';

describe('hooks/useFeedbackTypeOptions', () => {
  it('shows all the available options properly', () => {
    const { result } = renderHook(() => useFeedbackTypeOptions());

    expect(result.current).toMatchSnapshot();
  });
});
