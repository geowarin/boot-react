import counterpart from 'counterpart';
const translations = {
  en: require('lang/en.json'),
  fr: require('lang/fr.json')
};

const langs = Object.keys(translations);

const changeLocale = lang => {
  localStorage.setItem('locale', lang);
  counterpart.setLocale(lang);
};

langs.forEach(key => {
  counterpart.registerTranslations(key, translations[key]);
});

const currentLocale = localStorage.getItem('locale') || 'en';
counterpart.setLocale(currentLocale);

export {
  langs,
  changeLocale,
  currentLocale
}
