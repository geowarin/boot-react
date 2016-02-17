import React from 'react';
import reducer from 'reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import DevTools from 'config/devtools';
import promiseMiddleware from 'config/promiseMiddleware';

const middlewares = process.env.NODE_ENV === 'development' ?
  [applyMiddleware(promiseMiddleware), DevTools.instrument()] :
  [applyMiddleware(promiseMiddleware)];

var initialize = (initialState = {}) => {
  const store = createStore(reducer, initialState, compose(...middlewares));

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

