import { FC } from 'react';
import {
  Tag, TagLabel, TagLeftIcon, ThemingProps,
} from '@chakra-ui/react';
import { TiTick, TiTimes } from 'react-icons/ti';
import { CgSandClock } from 'react-icons/cg';
import { useTranslation } from 'react-i18next';
import { IMatchStatus } from 'customTypes/matching';

export interface IMatchStatusIconProps {
  status: IMatchStatus;
}

const useMatchStatus = (status: IMatchStatus) => {
  if (status === IMatchStatus.PENDING) return CgSandClock;
  if (status === IMatchStatus.REJECTED) return TiTimes;
  return TiTick;
};

const useMatchStatusColor = (status: IMatchStatus): ThemingProps['colorScheme'] => {
  if (status === IMatchStatus.PENDING) return 'blue';
  if (status === IMatchStatus.REJECTED) return 'red';
  return 'green';
};

const MatchStatusIcon: FC<IMatchStatusIconProps> = ({ status }) => {
  const { t } = useTranslation();

  return (
    <Tag size="lg" colorScheme={useMatchStatusColor(status)}>
      <TagLeftIcon boxSize="12px" as={useMatchStatus(status)} />
      <TagLabel>{t(`match_status.${status}`)}</TagLabel>
    </Tag>
  );
};

export default MatchStatusIcon;
