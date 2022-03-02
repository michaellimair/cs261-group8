/* eslint-disable react/jsx-no-constructed-context-values */
import { render } from '@testing-library/react';
import UserContext from 'context/UserContext';
import { UserGroup } from 'customTypes/auth';
import AccessControl from './AccessControl';

describe('components/AccessControl', () => {
  it('allows people with permission to access a resouce', () => {
    const result = render(
      <UserContext.Provider
        value={{
          user: { groups: [{ id: 1, name: UserGroup.MENTOR }] } as any,
          isLoading: false,
          isUnauthorized: false,
          refetch: jest.fn(),
        }}
      >
        <AccessControl allowedGroups={[UserGroup.MENTOR]}><div>hello</div></AccessControl>
      </UserContext.Provider>,
    );

    expect(result.container.innerHTML).toBe('<div>hello</div>');
  });

  it('does not allow people with no permission to access a resource', () => {
    const result = render(
      <UserContext.Provider
        value={{
          user: { groups: [] } as any,
          isLoading: false,
          isUnauthorized: false,
          refetch: jest.fn(),
        }}
      >
        <AccessControl allowedGroups={[UserGroup.MENTOR]}><div>hello</div></AccessControl>
      </UserContext.Provider>,
    );

    expect(result.container.innerHTML).toBe('');
  });

  it('prevents users that are not logged in from accessing anything', () => {
    const result = render(
      <UserContext.Provider
        value={{
          user: undefined,
          isLoading: false,
          isUnauthorized: true,
          refetch: jest.fn(),
        }}
      >
        <AccessControl allowedGroups={[UserGroup.MENTOR]}><div>hello</div></AccessControl>
      </UserContext.Provider>,
    );

    expect(result.container.innerHTML).toBe('');
  });
});
