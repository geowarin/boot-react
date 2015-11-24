import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import initStore from 'config/store';
import RouterComponent from 'config/router';
import axios from 'axios';
import axiosConfig from 'config/axios';
import { syncReduxAndRouter } from 'redux-simple-router';
import history from 'config/history';

axiosConfig();

var render = (headers, session) => {
  const initialState = {
    authentication: {
      token: headers['x-auth-token'] || null,
      isAuthenticated: session.isAuthenticated || false,
      username: session.username || null
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

axios.get('/api/session')
  .then(res => render(res.headers, res.data))
  .catch(err => render());

