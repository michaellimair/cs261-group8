import { IMatch, IRespondMatchDTO } from 'customTypes/matching';
import BaseAPI from '../base.api';
import CommonAPI from '../common.api';

class MentorMatchAPI extends CommonAPI {
  constructor(private readonly api: BaseAPI) {
    super('/mentor');
  }

  getMatches = (): Promise<IMatch[]> => this.api.get({
    path: this.getPath('/matches'),
  });

  respondToMatch = (
    data: IRespondMatchDTO & { id: number },
  ): Promise<IMatch> => this.api.patch<IMatch, IRespondMatchDTO>({
    path: this.getPath(`/matches/${data.id}`),
    body: { status: data.status },
  });
}

export default MentorMatchAPI;
