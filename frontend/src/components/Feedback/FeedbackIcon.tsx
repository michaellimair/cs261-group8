import { FeedbackType } from 'customTypes/feedback';
import { FC } from 'react';
import { FcHighPriority, FcIdea } from 'react-icons/fc';
import { GrCircleQuestion } from 'react-icons/gr';

export interface IFeedbackIconProps {
  type: FeedbackType;
}

const FeedbackIcon: FC<IFeedbackIconProps> = ({ type }) => {
  if (type === FeedbackType.IMPROVEMENT) {
    return <FcIdea />;
  }

  if (type === FeedbackType.BUG) {
    return <FcHighPriority />;
  }

  return <GrCircleQuestion />;
};

export default FeedbackIcon;
