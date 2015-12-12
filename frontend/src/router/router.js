import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

import App from 'ui/App';
import MyComponent from 'ui/Component';
import PrivatePage from 'ui/PrivatePage';
import LoginPage from 'ui/LoginPage';
import privateRoute from 'router/privateRoute';

export default (onLogout, store) => (
  <Route path="/" name="app" component={App}>
    <IndexRoute component={MyComponent}/>
    <Route path="private" component={privateRoute(PrivatePage, store)}/>
    <Route path="login" component={LoginPage}/>
    <Route path="logout" onEnter={onLogout}/>
  </Route>
);
