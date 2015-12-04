import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import initStore from 'config/store';
import RouterComponent from 'router/router';
import {setupAxiosInterceptors} from 'rest/axios';
import axios from 'axios';
import { syncReduxAndRouter } from 'redux-simple-router';
import history from 'router/history';

var render = (session = {isAuthenticated: false}) => {
  const initialState = {
    authentication: {
      token: session.token,
      isAuthenticated: session.isAuthenticated,
      username: session.username
    }
  };
  const store = initStore(initialState);
  syncReduxAndRouter(history, store);

  ReactDOM.render(
    <Provider store={store}>
      <RouterComponent />
    </Provider>,
    document.getElementById('root')
  );
};

setupAxiosInterceptors();
axios.get('/api/session')
  .then(res => render(res.data))
  .catch(err => render());

