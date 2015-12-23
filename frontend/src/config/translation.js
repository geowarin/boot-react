import counterpart from 'counterpart';
const translations = {
  en: require('lang/en.json'),
  fr: require('lang/fr.json')
};

Object.keys(translations).forEach(key => {
  counterpart.registerTranslations(key, translations[key]);
});
