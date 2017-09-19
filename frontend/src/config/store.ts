import React from 'react';
import { Middleware, createStore, applyMiddleware, compose, Store } from 'redux';
import { RouterState } from 'react-router-redux';
import { IntlState } from 'react-intl-redux';

import DevTools from '../config/devtools';
import promiseMiddleware from '../config/promiseMiddleware';
import { initialState as authentication, AuthenticationState, AuthenticationActions } from '../reducers/authentication';
import { initialState as simple, SimpleState, SimpleActions } from '../reducers/simple';
import { initialState as locale, LocaleState, LocaleActions } from '../reducers/locale';
import { rootReducer } from '../reducers';

const composeEnhancers = (
  process.env.NODE_ENV === 'development' &&
  window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
  authentication: AuthenticationState;
  simple: SimpleState;
  locale: LocaleState;
  router?: RouterState;
  intl: IntlState;
}

export type RootActions = AuthenticationActions | SimpleActions | LocaleActions;

const initialState: RootState = {
  authentication,
  simple,
  locale,
  intl: { locale: 'en', messages: {} }
};

function configureStore(externalMiddleware: Middleware[], initialState: RootState) {
  const middlewares: Middleware[] = externalMiddleware.concat([promiseMiddleware]);

  // compose enhancers
  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  );

  // create store
  return createStore<RootState>(
    rootReducer,
    initialState,
    enhancer
  );
}

// pass an optional param to rehydrate state on app start
const store = (middleware: Middleware[], overwriteInitialState?: Partial<RootState>) =>
  configureStore(middleware, overwriteInitialState ? { ...initialState, ...overwriteInitialState } : initialState);

// export store singleton instance
export default store;