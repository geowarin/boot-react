import ReactDOM from 'react-dom';
import React from 'react';
import initStore from 'config/store';
import RouterComponent from 'config/router';
import DevToolsComponent from 'config/devtools';
import axios from 'axios';
import axiosConfig from 'config/axios';
import isDev from 'isDev';

axiosConfig();

var render = (session) => {
  const initialState = {
    authentication: {
      token: session.token || null,
      isAuthenticated: session.isAuthenticated || false,
      username: session.username || null
    }
  };
  const store = initStore(initialState);
  const devTools = isDev ? <DevToolsComponent store={store}/> : null;

  ReactDOM.render(
    <div>
      {devTools}
      <RouterComponent store={store}/>
    </div>,
    document.getElementById('root')
  );
};

axios.get('/api/session')
  .then(res => render(res.data))
  .catch(err => render());

