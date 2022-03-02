/* eslint-disable max-classes-per-file */
import faker from '@faker-js/faker';
import CredentialManager from 'libs/credential-manager';

class StubCredentialManager extends CredentialManager {
  private authenticated: boolean;

  constructor(authenticated?: boolean) {
    super();
    this.token = faker.random.alphaNumeric(20);
    this.expiry = faker.date.future(20);
    this.authenticated = authenticated ?? true;
  }

  get credentials(): { token: string | null; expiry: Date | null; } {
    if (!this.authenticated) {
      return {
        token: null,
        expiry: null,
      };
    }
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
  create(authenticated = false) {
    return new StubCredentialManager(authenticated);
  }
}

export default CredentialManagerFactory;
