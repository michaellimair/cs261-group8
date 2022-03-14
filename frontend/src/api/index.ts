import CredentialManager from 'libs/credential-manager';
import AuthAPI from './auth.api';
import BaseAPI from './base.api';
import BusinessAreaAPI from './business-area.api';
import CountryAPI from './country.api';
import EventAPI from './event.api';
import FeedbackAPI from './feedback.api';
import LanguageAPI from './language.api';
import MenteeGroupSessionAPI from './mentee/group-session';
import MenteeMatchAPI from './mentee/match.api';
import MenteeMeetingAPI from './mentee/meeting.api';
import MenteeMyMentorAPI from './mentee/my-mentor.api';
import MenteePlanOfActionAPI from './mentee/plan-of-action.api';
import MentorGroupSessionAPI from './mentor/group-session';
import MentorMatchAPI from './mentor/match.api';
import MentorPlanOfActionAPI from './mentor/plan-of-action.api';
import UserProfileAPI from './profile.api';
import SkillAPI from './skill.api';
import TimezoneAPI from './timezone.api';

class HttpClient {
  constructor(
    private readonly storage: Storage = localStorage,
    private readonly credentialManager = new CredentialManager(storage),
    private readonly baseApi: BaseAPI = new BaseAPI({ credentialManager }),
    readonly auth: AuthAPI = new AuthAPI(baseApi, credentialManager),
    readonly feedback: FeedbackAPI = new FeedbackAPI(baseApi),
    readonly profile: UserProfileAPI = new UserProfileAPI(baseApi),
    readonly skill: SkillAPI = new SkillAPI(baseApi),
    readonly country: CountryAPI = new CountryAPI(baseApi),
    readonly timezone: TimezoneAPI = new TimezoneAPI(baseApi),
    readonly businessArea: BusinessAreaAPI = new BusinessAreaAPI(baseApi),
    readonly mentorMatch: MentorMatchAPI = new MentorMatchAPI(baseApi),
    readonly menteeMatch: MenteeMatchAPI = new MenteeMatchAPI(baseApi),
    readonly mentorPlanOfAction: MentorPlanOfActionAPI = new MentorPlanOfActionAPI(baseApi),
    readonly menteePlanOfAction: MenteePlanOfActionAPI = new MenteePlanOfActionAPI(baseApi),
    readonly language: LanguageAPI = new LanguageAPI(baseApi),
    readonly menteeMeeting: MenteeMeetingAPI = new MenteeMeetingAPI(baseApi),
    readonly events: EventAPI = new EventAPI(baseApi),
    readonly menteeMyMentor: MenteeMyMentorAPI = new MenteeMyMentorAPI(baseApi),
    readonly menteeGroupSession: MenteeGroupSessionAPI = new MenteeGroupSessionAPI(baseApi),
    readonly mentorGroupSession: MentorGroupSessionAPI = new MentorGroupSessionAPI(baseApi),
  ) {}
}

export const httpClient = new HttpClient();
