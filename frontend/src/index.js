import React from 'react';
import initStore from 'config/store';
import RouterComponent from 'config/router';
import DevToolsComponent from 'config/devtools';
import axios from 'axios';
import axiosConfig from 'config/axios';

axiosConfig();

var render = (session) => {
  const initialState = {
    authentication: {
      token: session.token || null,
      isAuthenticated: session.isAuthenticated || false
    }
  };
  const store = initStore(initialState);

  React.render(
    <div>
      <DevToolsComponent store={store}/>
      <RouterComponent store={store}/>
    </div>,
    document.getElementById('root')
  );
};

axios.get('/api/session')
  .then(res => render(res.data))
  .catch(err => render());

