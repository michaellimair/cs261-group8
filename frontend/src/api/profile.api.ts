import {
  IUserProfile, IUserProfileDTO,
} from 'customTypes/auth';
import { serialize } from 'object-to-formdata';
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
  ): Promise<IUserProfile> => this.api.patch<IUserProfile, FormData>({
    path: this.getPathById(id, '/'),
    body: serialize(payload, {
      nullsAsUndefineds: true,
    }),
  });
}

export default UserProfileAPI;
