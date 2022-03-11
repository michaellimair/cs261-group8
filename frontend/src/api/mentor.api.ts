import { IMatch, IRespondMatchDTO, IMatchStatus } from 'customTypes/matching';
import BaseAPI from './base.api';
import CommonAPI from './common.api';

class MentorAPI extends CommonAPI {
  constructor(private readonly api: BaseAPI) {
    super('/mentor');
  }

  getMatches = (): Promise<IMatch[]> => this.api.get({
    path: this.getPath('/matches'),
  });

  respondToMatch = (
    id: number,
    status: IMatchStatus.ACCEPTED | IMatchStatus.REJECTED,
  ): Promise<IMatch> => this.api.patch<IMatch, IRespondMatchDTO>({
    path: this.getPath(`/matches/${id}`),
    body: { status },
  });
}

export default MentorAPI;
