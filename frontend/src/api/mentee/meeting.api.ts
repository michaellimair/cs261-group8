import BaseAPI from 'api/base.api';
import CommonAPI from 'api/common.api';
import { IMeeting, IMeetingCreateDTO } from 'customTypes/meeting';

/**
 * API class to list, get, and create meetings as a mentee.
 */
class MenteeMeetingAPI extends CommonAPI {
  constructor(private readonly api: BaseAPI) {
    super('/mentee/meetings');
  }

  createMeeting = (data: IMeetingCreateDTO): Promise<IMeeting> => this.api.post<
  IMeeting,
  IMeetingCreateDTO>({
    path: this.getPath(''),
    body: data,
  });

  listMeetings = (): Promise<IMeeting[]> => this.api.get<IMeeting[]>({
    path: this.getPath(''),
  });

  getMeetingById = (id: number): Promise<IMeeting> => this.api.get<IMeeting>({
    path: this.getPath(`/${id}`),
  });
}

export default MenteeMeetingAPI;
