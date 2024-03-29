/* eslint-disable class-methods-use-this */
import { IUser, JobTitle } from 'customTypes/auth';
import { faker } from '@faker-js/faker';
import { merge } from 'lodash';

class UserFactory {
  create = (user?: Partial<IUser>): IUser => merge(({
    id: faker.datatype.number(),
    username: faker.internet.userName(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    full_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    profile: {
      pronoun: 'he',
      title: JobTitle.ANALYST,
      completed: true,
      years_experience: faker.datatype.number({
        max: 100,
      }),
      business_area: {
        name: 'technology',
        label: 'Technology',
      },
    },
    groups: [],
  }), user ?? {});
}

export default UserFactory;
