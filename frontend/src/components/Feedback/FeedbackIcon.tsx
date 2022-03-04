import { FeedbackType } from 'customTypes/feedback';
import { FC } from 'react';
import {
  Tag, TagLabel, TagLeftIcon, ThemingProps,
} from '@chakra-ui/react';
import { FcHighPriority, FcIdea } from 'react-icons/fc';
import { GrCircleQuestion } from 'react-icons/gr';
import { useTranslation } from 'react-i18next';

export interface IFeedbackIconProps {
  type: FeedbackType;
}

const useFeedbackIcon = (type: FeedbackType) => {
  if (type === FeedbackType.IMPROVEMENT) return FcIdea;
  if (type === FeedbackType.BUG) return FcHighPriority;
  return GrCircleQuestion;
};

const useFeedbackColor = (type: FeedbackType): ThemingProps['colorScheme'] => {
  if (type === FeedbackType.IMPROVEMENT) return 'blue';
  if (type === FeedbackType.BUG) return 'red';
  return 'cyan';
};

const FeedbackIcon: FC<IFeedbackIconProps> = ({ type }) => {
  const { t } = useTranslation();

  return (
    <Tag size="lg" variant="outline" colorScheme={useFeedbackColor(type)}>
      <TagLeftIcon boxSize="12px" as={useFeedbackIcon(type)} />
      <TagLabel>{t(`dashboard.feedback.${type}`)}</TagLabel>
    </Tag>
  );
};

export default FeedbackIcon;
