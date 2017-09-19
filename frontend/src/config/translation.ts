import { setLocale } from '../reducers/locale';
import { Store } from 'redux';
import { RootState } from './store';
import { updateIntl } from 'react-intl-redux';
import { Messages } from 'react-intl';

const translations: any = {
  en: require('assets/lang/en.json'),
  fr: require('assets/lang/fr.json')
};

const locales: string[] = Object.keys(translations);

let currentLocale: string = '';
const savedLocale: string = localStorage.getItem('locale') || 'en';

const registerLocales = (store: Store<RootState>) => {
  store.subscribe(() => {
    let previousLocale = currentLocale;
    currentLocale = store.getState().locale.currentLocale;
    if (previousLocale !== currentLocale) {
      localStorage.setItem('locale', currentLocale);
      store.dispatch(updateIntl({ locale: currentLocale, messages: getTranslations(translations, currentLocale) }));
    }
  });

  store.dispatch(setLocale(savedLocale));

  return savedLocale;
};

interface TranslationPair {
  key: string;
      value: string;
}

const getTranslations = (translations: any, locale: string): Messages => {
  return valuesToMessage(getFlatValues(translations[locale], []));
};

const valuesToMessage = (messages: TranslationPair[]): Messages => {
  const messageObj: Messages = {};
  messages.forEach(m => {
    messageObj[m.key] = {
      id: m.key,
      defaultMessage: m.value
    };
  });
  return messageObj;
};

const getFlatValues = (obj: any, currentPath: string[]): TranslationPair[] => {
  let values: TranslationPair[] = [];

  if (obj instanceof Object) {
    const childKeys = Object.keys(obj);
    childKeys.forEach(child => {
      const childObj = obj[child];
      values = values.concat(getFlatValues(childObj, [...currentPath, child]));
    });

    return values;
  } else {
    return [{key: currentPath.join('.'), value: obj}];
  }
};

export {
  locales,
  registerLocales
}
