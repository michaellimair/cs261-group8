/* eslint-disable react/jsx-no-constructed-context-values */
import { render } from '@testing-library/react';
import UserContext from 'context/UserContext';
import { IUser, UserGroup } from 'customTypes/auth';
import AccessControl from './AccessControl';

const createMockAccessControlComponent = (
  allowedGroups: UserGroup[],
  user?: Partial<IUser>,
) => render(
  <UserContext.Provider
    value={{
      user: user as IUser,
      isLoading: false,
      isUnauthorized: false,
      refetch: jest.fn(),
    }}
  >
    <AccessControl allowedGroups={allowedGroups}><div>hello</div></AccessControl>
  </UserContext.Provider>,
);

describe('components/AccessControl/AccessControl', () => {
  it('allows people with permission to access a resouce', () => {
    const result = createMockAccessControlComponent(
      [UserGroup.MENTOR],
      { groups: [{ id: 1, name: UserGroup.MENTOR }] },
    );

    expect(result.container.innerHTML).toBe('<div>hello</div>');
  });

  it('does not allow people with no permission to access a resource', () => {
    const result = createMockAccessControlComponent([UserGroup.MENTOR], { groups: [] });

    expect(result.container.innerHTML).toBe('');
  });

  it('prevents users that are not logged in from accessing anything', () => {
    const result = createMockAccessControlComponent(
      [UserGroup.MENTOR],
    );

    expect(result.container.innerHTML).toBe('');
  });
});
