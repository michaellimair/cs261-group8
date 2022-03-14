import BaseAPI from 'api/base.api';
import CommonAPI from 'api/common.api';
import {
  IMeeting,
  IMeetingMentorUpdateDTO,
  IMeetingStatus,
} from 'customTypes/meeting';

/**
 * API class to list, get, and create meetings as a mentor.
 */
class MentorMeetingAPI extends CommonAPI {
  constructor(private readonly api: BaseAPI) {
    super('/mentor/meetings');
  }

  listMeetings = (): Promise<IMeeting[]> => this.api.get<IMeeting[]>({
    path: this.getPath(''),
  });

  getMeetingById = (id: number): Promise<IMeeting> => this.api.get<IMeeting>({
    path: this.getPath(`/${id}`),
  });

  updateMeetingById = (
    id: number,
    data: Partial<IMeetingMentorUpdateDTO>,
  ): Promise<IMeeting> => this.api.patch<IMeeting, Partial<IMeetingMentorUpdateDTO>>({
    path: this.getPath(`${id}`),
    body: data,
  });

  approveMeetingById = (
    id: number,
  ): Promise<IMeeting> => this.updateMeetingById(
    id,
    { status: IMeetingStatus.ACCEPTED },
  );

  proposeAlternativeMeetingTimeById = (
    id: number,
    start_time: Date,
    end_time: Date,
  ) => this.updateMeetingById(
    id,
    {
      status: IMeetingStatus.ALTERNATIVE_PROPOSED,
      event: {
        start_time,
        end_time,
      },
    },
  );
}

export default MentorMeetingAPI;
