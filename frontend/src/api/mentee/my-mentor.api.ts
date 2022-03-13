import {
  IMyMentor,
} from 'customTypes/matching';
import { IRatingEntry, IRatingEntryDTO } from 'customTypes/rating';
import BaseAPI from '../base.api';
import CommonAPI from '../common.api';

class MenteeMyMentorAPI extends CommonAPI {
  constructor(private readonly api: BaseAPI) {
    super('/mentee/my-mentor');
  }

  getMyMentor = (): Promise<IMyMentor> => this.api.get({
    path: this.getPath(''),
  });

  rateMentor = (
    data: IRatingEntryDTO,
  ): Promise<IRatingEntry> => this.api.post<IRatingEntry, IRatingEntryDTO>({
    path: this.getPath('/matches'),
    body: data,
  });
}

export default MenteeMyMentorAPI;
