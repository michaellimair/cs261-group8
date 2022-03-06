/* eslint-disable class-methods-use-this */
import faker from '@faker-js/faker';
import { FeedbackType, IFeedback } from 'customTypes/feedback';
import { merge } from 'lodash';
import FeedbackReplyFactory from './FeedbackReplyFactory';

class FeedbackFactory {
  create = (feedback?: Partial<IFeedback>): IFeedback => {
    const replyFactory = new FeedbackReplyFactory();
    return merge({
      id: faker.datatype.number(),
      title: faker.lorem.lines(1),
      content: faker.lorem.paragraph(3),
      type: FeedbackType.BUG,
      created: new Date(),
      modified: new Date(),
      reply: replyFactory.create(),
    }, feedback);
  };

  createMany = (count: number) => Array(count).fill(null).map((_, i) => this.create({ id: i }));
}

export default FeedbackFactory;
