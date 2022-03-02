/* eslint-disable max-classes-per-file */
import faker from '@faker-js/faker';
import CredentialManager from 'libs/credential-manager';

class StubCredentialManager extends CredentialManager {
  constructor(token?: string | null, expiry?: Date | null) {
    super();
    this.token = token ?? faker.random.alphaNumeric(20);
    this.expiry = expiry ?? faker.date.future(20);
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
  create(token?: string | null, expiry?: Date | null) {
    return new StubCredentialManager(token, expiry);
  }
}

export default CredentialManagerFactory;
