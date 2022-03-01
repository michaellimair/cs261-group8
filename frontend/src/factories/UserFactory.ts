/* eslint-disable class-methods-use-this */
import { IUser, JobTitle } from 'customTypes/auth';
import { faker } from '@faker-js/faker';

class UserFactory {
  create = (): IUser => ({
    id: faker.datatype.number(),
    username: faker.internet.userName(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
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
  });
}

export default UserFactory;
