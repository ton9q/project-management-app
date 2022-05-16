import { defaultNS } from './i18n';

import common from '../../public/locales/en/common.json';
import page_welcome from '../../public/locales/en/page_welcome.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: {
      page_welcome: typeof page_welcome;
      common: typeof common;
    };
  }
}
