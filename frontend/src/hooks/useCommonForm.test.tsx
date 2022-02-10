import { FC, SyntheticEvent } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';
import { tick } from 'libs/testing';
import useCommonForm from './useCommonForm';

describe('hooks/useCommonForm', () => {
  let queryClient: QueryClient;
  let wrapper: FC;
  const mutationId = 'formMutation';
  let mutationFn: jest.Mock;

  beforeEach(() => {
    queryClient = new QueryClient();
    wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
    mutationFn = jest.fn();
  });

  it('initializes successfully', () => {
    expect(
      () => renderHook(() => useCommonForm({ mutationId, mutationFn }), { wrapper }),
    ).not.toThrow();
  });

  it('invokes the form submit function when onsubmit is called', async () => {
    const { result } = renderHook(() => useCommonForm({ mutationId, mutationFn }), { wrapper });
    await result.current.onSubmit({
      preventDefault: () => {},
      persist: () => {},
    } as SyntheticEvent);
    await tick(1);
    expect(mutationFn).toHaveBeenCalledTimes(1);
  });
});
