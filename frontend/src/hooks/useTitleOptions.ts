import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

const useTitleOptions = () => {
  const { t } = useTranslation();
  return useMemo(() => {
    const allTitles = ['anlst', 'assoc', 'avp', 'vp', 'dir', 'md'].map((title) => ({
      value: title,
      label: t(`job_title.${title}`),
    }));
    return [
      {
        value: null,
        label: '-',
      },
      ...allTitles,
    ];
  }, [t]);
};

export default useTitleOptions;
