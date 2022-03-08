import CredentialManager from 'libs/credential-manager';
import AuthAPI from './auth.api';
import BaseAPI from './base.api';
import CountryAPI from './country.api';
import FeedbackAPI from './feedback.api';
import UserProfileAPI from './profile.api';
import SkillAPI from './skill.api';
import TimezoneAPI from './timezone.api';

class HttpClient {
  constructor(
    private readonly credentialManager = new CredentialManager(),
    private readonly baseApi: BaseAPI = new BaseAPI({ credentialManager }),
    readonly auth: AuthAPI = new AuthAPI(baseApi, credentialManager),
    private readonly storage: Storage = localStorage,
    readonly feedback: FeedbackAPI = new FeedbackAPI(baseApi),
    readonly profile: UserProfileAPI = new UserProfileAPI(baseApi),
    readonly skill: SkillAPI = new SkillAPI(baseApi),
    readonly country: CountryAPI = new CountryAPI(baseApi),
    readonly timezone: TimezoneAPI = new TimezoneAPI(baseApi),
  ) {}
}

export const httpClient = new HttpClient();
