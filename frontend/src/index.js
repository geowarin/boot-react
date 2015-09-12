import React from 'react';
import initStore from 'config/store';
import RouterComponent from 'config/router';
import DevToolsComponent from 'config/devtools';
import axios from 'axios';
import axiosConfig from 'config/axios';

axiosConfig();

var render = (isAuthenticated, session = {}) => {
  const initialState = {
    authentication: {
      token: session.token,
      isAuthenticated: isAuthenticated
    }
  };
  const store = initStore(initialState);

  React.render(
    <div>
      <DevToolsComponent store={store} />
      <RouterComponent store={store} />
    </div>,
    document.getElementById('root')
  );
};

axios.get('/api/session/info')
  .then(res => render(true, res.data))
  .catch(err => render(false));

