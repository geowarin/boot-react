import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import initStore from 'config/store';
import RouterComponent from 'router/router';
import { setupAxiosInterceptors } from 'rest/axios';
import axios from 'axios';
import { syncReduxAndRouter } from 'redux-simple-router';
import {createHistory} from 'history';
import isDev from 'isDev';
import DevTools from 'config/devtools';

const devTools = isDev ? <DevTools /> : null;

const history = createHistory();
const store = initStore();
syncReduxAndRouter(history, store);
setupAxiosInterceptors(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <div>
      {devTools}
      <RouterComponent history={history}/>
    </div>
  </Provider>,
  document.getElementById('root')
);
