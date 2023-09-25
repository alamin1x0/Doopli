import translator from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLocales} from 'react-native-localize';
import en from './src/utils/language/en.json';
import ar from './src/utils/language/ar.json';
import fr from './src/utils/language/fr.json';
import pt from './src/utils/language/pt.json';
import ru from './src/utils/language/ru.json';
import tr from './src/utils/language/tr.json';
import zh from './src/utils/language/zh.json';
import bn from './src/utils/language/bn.json';
import nl from './src/utils/language/nl.json';
import ca from './src/utils/language/ca.json';
import bg from './src/utils/language/bg.json';
import et from './src/utils/language/et.json';

translator.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: getLocales()[0].languageCode,
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en,
    },
    bn:{
      translation: bn,
    },
    ar: {
      translation: ar,
    },
    fr: {
      translation: fr,
    },
    pt: {
      translation: pt,
    },
    ru: {
      translation: ru,
    },
    tr: {
      translation: tr,
    },
    zh: {
      translation: zh,
    },
    nl:{
      translation: nl,
    },
    ca:{
      translation: ca,
    },
    bg:{
      translation: bg,
    },
    et:{
      translation: et
    }
  },
});

export default translator;
