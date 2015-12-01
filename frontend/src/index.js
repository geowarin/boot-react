import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import initStore from 'config/store';
import RouterComponent from 'config/router';
import axios from 'rest/axios';
import { syncReduxAndRouter } from 'redux-simple-router';
import history from 'config/history';

var render = (session) => {
  const initialState = {
    authentication: {
      token: session.token || null,
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
  .then(res => render(res.data))
  .catch(err => render());

