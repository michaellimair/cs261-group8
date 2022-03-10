export const JWT_TOKEN_KEY = 'jwt_token';
export const JWT_EXPIRY_KEY = 'jwt_expiry';

class CredentialManager {
  protected token: string | null = null;

  protected expiry: Date | null = null;

  constructor(private readonly storage: Storage = localStorage) {
    this.restoreAuthenticationCredentials();
  }

  private restoreAuthenticationCredentials() {
    this.token = this.storage.getItem(JWT_TOKEN_KEY);
    const expiryStr = this.storage.getItem(JWT_EXPIRY_KEY);

    if (expiryStr) {
      this.expiry = new Date(expiryStr);
    }

    if (this.isCredentialExpired()) {
      this.clearCredentials();
    }
  }

  private isCredentialExpired(): boolean {
    return this.expiry !== null && (new Date()).getTime() > this.expiry.getTime();
  }

  setCredentials(token: string, expiry: Date) {
    this.token = token;
    this.expiry = expiry;
    this.storage.setItem(JWT_TOKEN_KEY, this.token);
    this.storage.setItem(JWT_EXPIRY_KEY, this.expiry.toISOString());
  }

  clearCredentials() {
    this.storage.removeItem(JWT_TOKEN_KEY);
    this.storage.removeItem(JWT_EXPIRY_KEY);

    this.token = null;
    this.expiry = null;
  }

  get credentials() {
    if (this.isCredentialExpired()) {
      this.clearCredentials();
    }
    return {
      token: this.token,
      expiry: this.expiry,
    };
  }
}

export default CredentialManager;
