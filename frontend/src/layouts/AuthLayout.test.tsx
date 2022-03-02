/* eslint-disable import/first */
jest.mock('layouts/UserLayout', () => jest.fn(() => null));

import { render } from '@testing-library/react';
import * as useUser from 'hooks/useUser';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AuthLayout from './AuthLayout';

describe('AuthLayout', () => {
  it('renders properly', () => {
    const result = render(<AuthLayout />);
    expect(result).toMatchSnapshot();
  });

  it('redirects to dashboard if user is logged in', () => {
    const useUserSpy = jest.spyOn(useUser, 'useUser').mockReturnValue({
      isLoggedIn: true,
      isLoading: false,
    } as any);

    const result = render(
      <MemoryRouter initialEntries={['/auth']}>
        <Routes>
          <Route path="auth" element={<AuthLayout />} />
          <Route path="dashboard" element={<div>dashboard</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(result.container.innerHTML).toBe('<div>dashboard</div>');

    useUserSpy.mockRestore();
  });
});
