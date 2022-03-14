import BaseAPI from 'api/base.api';
import CommonAPI from 'api/common.api';

class MenteeGroupSessionAPI extends CommonAPI {
  constructor(
    private readonly api: BaseAPI,
  ) {
    super('/mentee/group-sessions/');
  }

  listGroupSessions = () => this.api.get({
    path: this.getPath(''),
  });

  proposeGroupSession = (
    interests: string[],
  ) => this.api.post({
    path: this.getPath('/request-session'),
    body: { requested_skills: interests.map((skill) => ({ skill })) },
  });

  signupForSession = (
    sessionId: number,
  ) => this.api.post({
    path: this.getPath(`/${sessionId}/signup`),
  });
}

export default MenteeGroupSessionAPI;
