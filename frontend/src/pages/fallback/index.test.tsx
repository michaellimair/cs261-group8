import { render } from '@testing-library/react';
import * as useUser from 'hooks/useUser';
import {
  MemoryRouter, Route, Routes,
} from 'react-router-dom';
import FallbackPage from '.';

describe('fallback', () => {
  const MockRouterComponent = () => (
    <MemoryRouter>
      <Routes>
        <Route path="dashboard" element={<div>dashboard</div>} />
        <Route path="auth" element={<div>auth</div>} />
        <Route path="*" element={<FallbackPage />} />
      </Routes>
    </MemoryRouter>
  );

  it('renders properly', async () => {
    const result = render(<MockRouterComponent />);
    expect(result).toMatchSnapshot();
  });

  it('redirects to auth if user is not logged in', () => {
    const useUserSpy = jest.spyOn(useUser, 'useUser').mockReturnValue({
      isLoggedIn: false,
      isLoading: false,
    } as any);

    const result = render(
      <MockRouterComponent />,
    );

    expect(result.container.innerHTML).toBe('<div>auth</div>');

    useUserSpy.mockRestore();
  });

  it('redirects to dasboard if user is logged in', () => {
    const useUserSpy = jest.spyOn(useUser, 'useUser').mockReturnValue({
      isLoggedIn: true,
      isLoading: false,
    } as any);

    const result = render(
      <MockRouterComponent />,
    );

    expect(result.container.innerHTML).toBe('<div>dashboard</div>');

    useUserSpy.mockRestore();
  });
});
