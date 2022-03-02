/* eslint-disable react/jsx-no-constructed-context-values */
import { render } from '@testing-library/react';
import UserContext from 'context/UserContext';
import { UserGroup } from 'customTypes/auth';
import MenteeOnly from './MenteeOnly';

const createMockMenteeComponent = (userGroup: UserGroup) => render(
  <UserContext.Provider
    value={{
      user: { groups: [{ id: 1, name: userGroup }] } as any,
      isLoading: false,
      isUnauthorized: false,
      refetch: jest.fn(),
    }}
  >
    <MenteeOnly><div>hello</div></MenteeOnly>
  </UserContext.Provider>,
);

describe('components/AccessControl/MenteeOnly', () => {
  it('allows mentee to access mentee resources', () => {
    const result = createMockMenteeComponent(UserGroup.MENTEE);

    expect(result.container.innerHTML).toBe('<div>hello</div>');
  });

  it('prevents mentor from accessing mentee resources', () => {
    const result = createMockMenteeComponent(UserGroup.MENTOR);

    expect(result.container.innerHTML).toBe('');
  });
});
