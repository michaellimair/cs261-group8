import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const NotFoundPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {t('not_found.title')}
        </p>
      </header>
    </div>
  );
};

export default NotFoundPage;
