import React               from 'react';
import { Router }          from 'react-router';
import { history }         from 'react-router/lib/HashHistory';
import { Provider }        from 'react-redux';
//import * as reducers       from './reducers';
import routes              from './routes';
import thunkMiddleware     from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

const initialState = {};

const reducer = combineReducers([]);
const store   = applyMiddleware(thunkMiddleware)(createStore)(reducer, initialState);

React.render(
  <Provider store={store}>
    {() =>
      <Router children={routes} history={history} />
    }
  </Provider>,
  document.getElementById('root')
);
