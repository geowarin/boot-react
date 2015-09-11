import React from 'react';
import store from 'config/store';
import RouterComponent from 'config/router';
import DevToolsComponent from 'config/devtools';
import axiosConfig from 'axios';

axiosConfig();

React.render(
  <div>
    <DevToolsComponent store={store} />
    <RouterComponent store={store} />
  </div>,
  document.getElementById('root')
);
