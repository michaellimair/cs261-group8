/* eslint-disable class-methods-use-this */
import faker from '@faker-js/faker';
import { IFeedbackReply } from 'customTypes/feedback';
import { merge } from 'lodash';
import UserFactory from './UserFactory';

class FeedbackReplyFactory {
  create = (reply?: Partial<IFeedbackReply>): IFeedbackReply => {
    const user = new UserFactory();
    return merge({
      id: faker.datatype.number(),
      content: faker.lorem.paragraph(3),
      created: new Date(),
      updated: new Date(),
      admin: user.create(),
    }, reply);
  };
}

export default FeedbackReplyFactory;
