import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export const defaultNS = 'common';

export default i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    // debug: true,

    fallbackLng: 'en',
    lng: 'en',

    ns: ['common'],
    defaultNS,
    nsSeparator: ':',
    keySeparator: '.',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    backend: {
      loadPath: (languages, namespaces) => {
        const lowerCaseNamespaces = namespaces.map((ns) => ns.toLowerCase());
        return `/locales/${languages}/${lowerCaseNamespaces}.json`;
      },
      allowMultiLoading: false,
    },

    react: {
      useSuspense: true,
    },
  });
