import { IInitiateMatchDTO, IMatch, IMatchSuggestion } from 'customTypes/matching';
import BaseAPI from '../base.api';
import CommonAPI from '../common.api';

class MenteeAPI extends CommonAPI {
  constructor(private readonly api: BaseAPI) {
    super('/mentee');
  }

  getMatches = (): Promise<IMatch[]> => this.api.get({
    path: this.getPath('/matches'),
  });

  getMatchSuggestions = (): Promise<IMatchSuggestion[]> => this.api.get({
    path: this.getPath('/match-suggestions'),
  });

  initiateMatch = (mentor_id: number): Promise<IMatch> => this.api.post<IMatch, IInitiateMatchDTO>({
    path: this.getPath('/matches'),
    body: { mentor_id },
  });
}

export default MenteeAPI;
