import { render } from '@testing-library/react';
import InitializingApp from 'components/InitializingApp';
import * as useUser from 'hooks/useUser';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UserLayout from './UserLayout';

describe('UserLayout', () => {
  it('renders properly', () => {
    const queryClient = new QueryClient();
    const result = render(
      <QueryClientProvider client={queryClient}>
        <UserLayout />
      </QueryClientProvider>,
    );
    expect(result).toMatchSnapshot();
  });

  it('shows initializing screen if user data is loading', () => {
    jest.spyOn(useUser, 'useUser').mockReturnValue({
      isLoggedIn: false,
      isLoading: true,
    } as any);

    const result = render(<UserLayout />);
    const initializing = render(<InitializingApp />);

    expect(result.container.innerHTML).toEqual(initializing.container.innerHTML);
  });

  it('redirects to dashboard if user is logged in', () => {
    const useUserSpy = jest.spyOn(useUser, 'useUser').mockReturnValue({
      isLoggedIn: false,
      isLoading: false,
    } as any);

    const result = render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="dashboard" element={<UserLayout />} />
          <Route path="auth" element={<div>auth</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(result.container.innerHTML).toBe('<div>auth</div>');

    useUserSpy.mockRestore();
  });
});
