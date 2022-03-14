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

  getMyRating = (): Promise<IRatingEntry> => this.api.get<IRatingEntry>({
    path: this.getPath('/rating'),
  });

  rateMentor = (
    data: IRatingEntryDTO,
  ): Promise<IRatingEntry> => this.api.post<IRatingEntry, IRatingEntryDTO>({
    path: this.getPath('/rating'),
    body: data,
  });
}

export default MenteeMyMentorAPI;
