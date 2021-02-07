import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next) // connect with React
  .init({
    debug: true,
    lng: 'nl',
    fallbackLng: 'nl',
    whitelist: ['en', 'nl'],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;