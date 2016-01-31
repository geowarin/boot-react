import counterpart from 'counterpart';
import {setLocale} from 'reducers/locale';
const translations = {
  en: require('lang/en.json'),
  fr: require('lang/fr.json')
};

const locales = Object.keys(translations);

let currentLocale;
let savedLocale = localStorage.getItem('locale') || 'en';
const registerLocales = (store) => {
  locales.forEach(key => {
    counterpart.registerTranslations(key, translations[key]);
  });
  store.subscribe(() => {
    let previousLocale = currentLocale;
    currentLocale = store.getState().locale.currentLocale;
    if (previousLocale !== currentLocale) {
      localStorage.setItem('locale', currentLocale);
      counterpart.setLocale(currentLocale);
    }
  });
  store.dispatch(setLocale(savedLocale));
  return savedLocale;
};

export {
  locales,
  registerLocales
}
