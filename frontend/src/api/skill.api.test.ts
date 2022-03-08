/* eslint-disable max-classes-per-file */
import { ApiFactory } from 'factories/ApiFactory';
import SkillAPI from './skill.api';
import BaseAPI from './base.api';

describe('skill.api.ts', () => {
  let skillApi: SkillAPI;
  let api: BaseAPI;

  beforeEach(() => {
    const apiFactory = new ApiFactory();
    api = apiFactory.create();
    skillApi = new SkillAPI(api);
  });

  it('instantiates successfully', () => {
    expect(() => new SkillAPI(api)).not.toThrow();
  });

  describe('listSkills', () => {
    it('can list skills successfully without query', async () => {
      await skillApi.listSkills();

      expect(api.get).toHaveBeenCalledTimes(1);
      expect(api.get).toHaveBeenCalledWith({
        path: '/skills',
        query: {
          q: undefined,
        },
      });
    });

    it('can list skills successfully with search string', async () => {
      await skillApi.listSkills('Python');

      expect(api.get).toHaveBeenCalledTimes(1);
      expect(api.get).toHaveBeenCalledWith({
        path: '/skills',
        query: {
          q: 'Python',
        },
      });
    });
  });
});
