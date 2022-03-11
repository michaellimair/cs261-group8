import {
  IUserProfile, IUserProfileDTO,
} from 'customTypes/auth';
import { serialize } from 'object-to-formdata';
import urljoin from 'url-join';
import BaseAPI from './base.api';

/**
 * API class which wraps all authentication methods.
 */
class UserProfileAPI {
  private basePath: string;

  constructor(
    private readonly api: BaseAPI,
  ) {
    this.basePath = '/users/:id/profile';
  }

  private getPath = (id: number, path: string) => urljoin(this.basePath.replace(':id', `${id}`), path);

  getProfile = (id: number): Promise<IUserProfile> => this.api.get<IUserProfile>({
    path: this.getPath(id, '/'),
  });

  updateProfile = async (
    id: number,
    payload: Partial<IUserProfileDTO>,
  ): Promise<IUserProfile> => this.api.patch<IUserProfile, FormData>({
    path: this.getPath(id, ''),
    body: serialize(payload, {
      nullsAsUndefineds: true,
    }),
  });
}

export default UserProfileAPI;
