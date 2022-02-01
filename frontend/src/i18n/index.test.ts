import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

describe('i18n', () => {
  it('initializes the i18n library properly', async () => {
    const i18nUseSpy = jest.spyOn(i18n, 'use');
    const i18nInitSpy = jest.spyOn(i18n, 'init');

    // eslint-disable-next-line
    require('./index');

    expect(i18nUseSpy).toHaveBeenCalledTimes(2);
    expect(i18nUseSpy).toHaveBeenNthCalledWith(1, initReactI18next);
    expect(i18nUseSpy).toHaveBeenNthCalledWith(2, LanguageDetector);

    expect(i18nInitSpy).toHaveBeenCalled();
  });
});
