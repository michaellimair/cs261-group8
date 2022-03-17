import {
  IUserProfile, IUserProfileDTO,
} from 'customTypes/auth';
import BaseAPI from './base.api';
import CommonAPI from './common.api';

/**
 * API class which wraps all authentication methods.
 */
class UserProfileAPI extends CommonAPI {
  constructor(
    private readonly api: BaseAPI,
  ) {
    super('/users/:id/profile');
  }

  getProfile = (id: number): Promise<IUserProfile> => this.api.get<IUserProfile>({
    path: this.getPathById(id, '/'),
  });

  updateProfile = async (
    id: number,
    payload: Partial<IUserProfileDTO>,
  ): Promise<IUserProfile> => {
    const formData = new FormData();

    Object.entries(payload).forEach(([k, v]) => {
      if (k === 'languages') {
        payload.languages!.forEach((language) => {
          formData.append('languages', language.code);
        });
      } else if (k === 'skills' || k === 'interests') {
        payload[k]!.forEach((item) => {
          formData.append(k, item);
        });
      } else if (k === 'avatar') {
        if (v) {
          formData.append('avatar', v as File);
        }
      // eslint-disable-next-line no-empty
      } else if (k === 'groups') {

      } else if (v !== undefined || v !== null) {
        formData.append(k.replace('[]', ''), v as any);
      }
    });

    if (payload.groups) {
      await this.api.patch({
        path: '/auth',
        body: {
          group_ids: payload.groups.map((it) => it.id),
        },
      });
    }

    return this.api.patch<IUserProfile, FormData>({
      path: this.getPathById(id, '/'),
      body: formData,
    });
  };
}

export default UserProfileAPI;
