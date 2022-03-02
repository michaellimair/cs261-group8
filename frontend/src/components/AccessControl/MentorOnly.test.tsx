/* eslint-disable react/jsx-no-constructed-context-values */
import { render } from '@testing-library/react';
import UserContext from 'context/UserContext';
import { UserGroup } from 'customTypes/auth';
import MentorOnly from './MentorOnly';

const createMockMentorComponent = (userGroup: UserGroup) => render(
  <UserContext.Provider
    value={{
      user: { groups: [{ id: 1, name: userGroup }] } as any,
      isLoading: false,
      isUnauthorized: false,
      refetch: jest.fn(),
    }}
  >
    <MentorOnly><div>hello</div></MentorOnly>
  </UserContext.Provider>,
);

describe('components/AccessControl/MentorOnly', () => {
  it('allows mentor to access mentor resources', () => {
    const result = createMockMentorComponent(UserGroup.MENTOR);

    expect(result.container.innerHTML).toBe('<div>hello</div>');
  });

  it('prevents mentee from accessing mentor resources', () => {
    const result = createMockMentorComponent(UserGroup.MENTEE);

    expect(result.container.innerHTML).toBe('');
  });
});
