/* eslint-disable global-require */
/* eslint-disable jest/expect-expect */
import { Context, createContext, FC } from 'react';
import UserFactory from 'factories/UserFactory';
import { IUser, UserGroup } from 'customTypes/auth';
import { renderHook } from '@testing-library/react-hooks';
import { IUserContext } from 'context/UserContext';
import useUser from './useUser';

const userFactory = new UserFactory();

const createContextValue = (user?: IUser) => ({
  user,
  refetch: jest.fn(),
  isLoading: !user,
  isUnauthorized: false,
});

const createMockUserWrapper: (value: IUserContext) => {
  wrapper: FC,
  context: Context<IUserContext>,
} = (
  value,
) => {
  const MockContext = createContext<IUserContext>(value);

  return {
    wrapper: ({ children }) => (
      <MockContext.Provider value={value}>
        {children}
      </MockContext.Provider>
    ),
    context: MockContext,
  };
};

describe('hooks/useUser', () => {
  it('initializes correctly without parameters', () => {
    expect(() => renderHook(() => useUser())).not.toThrow();
  });

  it('returns logged in status correctly', () => {
    const { wrapper, context } = createMockUserWrapper(
      createContextValue(),
    );
    const { result } = renderHook(() => useUser({ context }), {
      wrapper,
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.isMentor).toBe(false);
    expect(result.current.isMentee).toBe(false);
  });

  it('returns mentee status correctly', () => {
    const mockUser = userFactory.create({
      groups: [{
        id: 1,
        name: UserGroup.MENTEE,
      }],
    });
    const { wrapper, context } = createMockUserWrapper(
      createContextValue(mockUser),
    );
    const { result } = renderHook(() => useUser({ context }), {
      wrapper,
    });
    expect(result.current.user).toBe(mockUser);
    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.isMentee).toBe(true);
  });

  it('returns mentor status correctly', () => {
    const mockUser = userFactory.create({
      groups: [{
        id: 1,
        name: UserGroup.MENTOR,
      }],
    });
    const { wrapper, context } = createMockUserWrapper(
      createContextValue(mockUser),
    );
    const { result } = renderHook(() => useUser({ context }), {
      wrapper,
    });
    expect(result.current.user).toBe(mockUser);
    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.isMentor).toBe(true);
  });
});
