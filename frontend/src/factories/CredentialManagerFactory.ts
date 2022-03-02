/* eslint-disable max-classes-per-file */
import faker from '@faker-js/faker';
import CredentialManager from 'libs/credential-manager';

class StubCredentialManager extends CredentialManager {
  constructor() {
    super();
    this.token = faker.random.alphaNumeric(20);
    this.expiry = faker.date.future(20);
  }

  get credentials(): { token: string | null; expiry: Date | null; } {
    return {
      token: this.token,
      expiry: this.expiry,
    };
  }

  clearCredentials = jest.fn();

  setCredentials = jest.fn();
}

class CredentialManagerFactory {
  // eslint-disable-next-line class-methods-use-this
  create() {
    return new StubCredentialManager();
  }
}

export default CredentialManagerFactory;
