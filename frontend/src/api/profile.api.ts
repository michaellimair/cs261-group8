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
  ): Promise<IUserProfile> => this.api.post<IUserProfile, Partial<IUserProfileDTO>>({
    path: this.getPathById(id, '/'),
    body: payload,
  });
}

export default UserProfileAPI;
