import React from 'react';
import reducer from 'reducers';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import isDev from 'isDev';
import DevTools from 'config/devtools';
import promiseMiddleware from 'config/promiseMiddleware';

const middlewares = isDev ?
  [applyMiddleware(promiseMiddleware), DevTools.instrument()] :
  [applyMiddleware(promiseMiddleware)];
const finalCreateStore = compose(...middlewares)(createStore);

var initialize = (initialState = {}) => {
  const store = finalCreateStore(reducer, initialState);

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

