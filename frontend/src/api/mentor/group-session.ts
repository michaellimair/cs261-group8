import BaseAPI from 'api/base.api';
import CommonAPI from 'api/common.api';
import { IGroupSession, IGroupSessionCreateDTO, IGroupSessionSuggestion } from 'customTypes/group-session';

class MentorGroupSessionAPI extends CommonAPI {
  constructor(private readonly api: BaseAPI) {
    super('/mentor/group-sessions/');
  }

  listMySessions = (): Promise<IGroupSession[]> => this.api.get({
    path: this.getPath('/'),
  });

  createGroupSession = (data: IGroupSessionCreateDTO): Promise<IGroupSession> => this.api.post<
  IGroupSession,
  IGroupSessionCreateDTO>({
    path: this.getPath('/'),
    body: data,
  });

  getSuggestions = (): Promise<IGroupSessionSuggestion[]> => this.api.get({
    path: this.getPath('/suggestions'),
  });
}

export default MentorGroupSessionAPI;
