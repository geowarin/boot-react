import React from 'react';
import reducer from 'reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import DevTools from 'config/devtools';
import promiseMiddleware from 'config/promiseMiddleware';

import history from 'router/history';
import { syncHistory } from 'react-router-redux';

const historyMiddleware = syncHistory(history);

const middlewares = process.env.NODE_ENV === 'development' ?
  [applyMiddleware(historyMiddleware, promiseMiddleware), DevTools.instrument()] :
  [applyMiddleware(historyMiddleware, promiseMiddleware)];

var initialize = (initialState = {}) => {
  const store = createStore(reducer, initialState, compose(...middlewares));
  if (process.env.NODE_ENV === 'development') {
    historyMiddleware.listenForReplays(store);
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }
  return store;
};

export default initialize;

