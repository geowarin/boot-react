import React from 'react';
import reducers from 'reducers';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import isDev from 'isDev';
import DevTools from 'config/devtools'

function configureStore() {
  const middlewares = isDev ?
    [applyMiddleware(thunk), DevTools.instrument()] :
    [applyMiddleware(thunk)];
  const store = compose(...middlewares)(createStore);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

var initialize = (initialState) => {
  return configureStore()(reducers, initialState)
};

export default initialize;

