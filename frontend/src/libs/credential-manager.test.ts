import { addDays } from 'date-fns';
import CredentialManager, { JWT_EXPIRY_KEY, JWT_TOKEN_KEY } from './credential-manager';

const mockToken = 'credentialToken';
const mockExpiry = addDays(new Date(), 10);

const createMockStorage = ({ token, expiry }: {
  token?: string | null;
  expiry?: Date | null;
} = {}): Storage => ({
  setItem: jest.fn(),
  getItem: jest.fn((key) => {
    if (key === JWT_TOKEN_KEY) {
      return token ?? mockToken;
    }
    if (key === JWT_EXPIRY_KEY) {
      return expiry?.toISOString() ?? mockExpiry.toISOString();
    }
    return null;
  }),
  removeItem: jest.fn(),
  length: 0,
  clear: jest.fn(),
  key: jest.fn(),
});

describe('CredentialManager', () => {
  let storage: Storage;
  let credentialManager: CredentialManager;

  beforeEach(() => {
    storage = createMockStorage();
    credentialManager = new CredentialManager(storage);
  });

  it('instantiates successfully with localStorage', () => {
    expect(() => new CredentialManager()).not.toThrow();
  });

  it('instantiates successfully', () => {
    expect(storage.getItem).toHaveBeenCalledTimes(2);

    expect(credentialManager.credentials).toEqual({
      token: mockToken,
      expiry: mockExpiry,
    });
  });

  it('instantiates successfully without credentials', () => {
    storage = createMockStorage({
      expiry: null,
      token: null,
    });
    credentialManager = new CredentialManager(storage);
    expect(storage.getItem).toHaveBeenCalledTimes(2);

    expect(credentialManager.credentials).toEqual({
      token: mockToken,
      expiry: mockExpiry,
    });
  });

  it('automatically clears loaded credentials if it is expired', () => {
    const mockExpiredTokenExpiry = new Date();
    mockExpiredTokenExpiry.setTime(new Date().getTime() - 100000000);
    storage = createMockStorage({ expiry: mockExpiredTokenExpiry });
    credentialManager = new CredentialManager(storage);

    expect(credentialManager.credentials).toMatchObject({
      token: null,
      expiry: null,
    });
  });

  describe('setCredentials', () => {
    beforeEach(() => {
      storage = createMockStorage();
      credentialManager = new CredentialManager(storage);
    });

    it('sets token according to the requirements', () => {
      const newToken = 'newToken';
      const futureDate = new Date('2022-06-25');

      credentialManager.setCredentials(newToken, futureDate);

      expect(storage.setItem).toHaveBeenCalledTimes(2);

      expect(credentialManager.credentials).toMatchObject({
        token: newToken,
        expiry: futureDate,
      });
    });
  });

  describe('clearCredentials', () => {
    it('clears token according to the requirements', () => {
      credentialManager.clearCredentials();

      expect(storage.removeItem).toHaveBeenCalledTimes(2);
      expect(credentialManager.credentials).toMatchObject({
        token: null,
        expiry: null,
      });
    });
  });

  describe('credentials', () => {
    it('clears expired credentials automatically', () => {
      const mockFutureTime = new Date();
      mockFutureTime.setTime(mockExpiry.getTime() + 100000000);

      jest
        .useFakeTimers()
        .setSystemTime(mockFutureTime.getTime());

      expect(credentialManager.credentials).toMatchObject({
        token: null,
        expiry: null,
      });

      jest.useRealTimers();
    });
  });
});
