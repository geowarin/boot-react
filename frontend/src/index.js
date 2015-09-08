import React               from 'react';
import { Router }          from 'react-router';
import { history }         from 'react-router/lib/HashHistory';
import { Provider }        from 'react-redux';
import reducers            from './reducers';
import routes              from './routes';
import thunkMiddleware     from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

const initialState = {
  counter: 0
};

//const store   = applyMiddleware(thunkMiddleware)(createStore)(reducers, initialState);
const store   = createStore(reducers, initialState);

React.render(
  <Provider store={store}>
    {() =>
      <Router children={routes} history={history} />
    }
  </Provider>,
  document.getElementById('root')
);
