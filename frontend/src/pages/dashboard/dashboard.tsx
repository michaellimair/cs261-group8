import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const DashboardHomePage: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      {t('dashboard.home.description')}
    </div>
  );
};

export default DashboardHomePage;
