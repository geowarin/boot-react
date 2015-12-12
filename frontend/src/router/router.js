import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

import App from 'ui/App';
import MyComponent from 'ui/Component';
import PrivatePage from 'ui/PrivatePage';
import LoginPage from 'ui/LoginPage';

export default (onLogout) => (
  <Route path="/" name="app" component={App}>
    <IndexRoute component={MyComponent}/>
    <Route path="private" component={PrivatePage} />
    <Route path="login" component={LoginPage}/>
    <Route path="logout" onEnter={onLogout}/>
  </Route>
);
