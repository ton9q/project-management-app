import { defaultNS } from './i18n';

import common from '../../public/locales/en/common.json';
import form_message from '../../public/locales/en/form_message.json';
import page_welcome from '../../public/locales/en/page_welcome.json';
import pages_registration from '../../public/locales/en/pages_registration.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: {
      common: typeof common;
      form_message: typeof form_message;
      page_welcome: typeof page_welcome;
      pages_registration: typeof pages_registration;
    };
  }
}
