import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const DashboardMenteeOnlyPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      {t('dashboard.mentee_only.description')}
    </div>
  );
};

export default DashboardMenteeOnlyPage;
