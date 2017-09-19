const SET_LOCALE = 'locale/SET_LOCALE';

interface SetLocaleAction {
  type: typeof SET_LOCALE;
  locale: string;
}

export type LocaleActions = SetLocaleAction;

export interface LocaleState {
  currentLocale: string;
}

export const initialState: LocaleState = {
  currentLocale: 'en'
};

export default function reducer(state = initialState, action: LocaleActions): LocaleState {
  switch (action.type) {
    case SET_LOCALE:
      return {
        currentLocale: action.locale
      };
    default:
      return state;
  }
}

export function setLocale(locale: string) {
  return {
    type: SET_LOCALE,
    locale
  };
}
