import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import initStore from 'config/store';
import RouterComponent from 'router/router';
import { setupAxiosInterceptors } from 'rest/axios';
import axios from 'axios';
import { syncReduxAndRouter } from 'redux-simple-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import isDev from 'isDev';
import DevTools from 'config/devtools';

const devTools = isDev ? <DevTools /> : null;

var render = (session = {isAuthenticated: false}) => {
  const initialState = {
    authentication: {
      token: session.token,
      isAuthenticated: session.isAuthenticated,
      username: session.username
    }
  };
  const history = createBrowserHistory();
  const store = initStore(initialState);
  syncReduxAndRouter(history, store);
  setupAxiosInterceptors(store.dispatch);

  ReactDOM.render(
    <Provider store={store}>
      <div>
        {devTools}
        <RouterComponent history={history} />
      </div>
    </Provider>,
    document.getElementById('root')
  );
};

axios.get('/api/session')
  .then(res => render(res.data))
  .catch(err => render());

