import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { Provider, intlReducer as intl } from 'react-intl-redux';

import { RootState } from '../config/store';
import simple from './simple';
import authentication from './authentication';
import locale from './locale';

export const rootReducer = combineReducers<RootState>({
  simple,
  authentication,
  locale,
  router,
  intl
});
