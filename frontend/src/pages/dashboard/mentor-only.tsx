import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const DashboardMentorOnlyPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      {t('dashboard.mentor_only.description')}
    </div>
  );
};

export default DashboardMentorOnlyPage;
