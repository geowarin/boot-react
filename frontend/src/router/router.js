import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

import App from 'container/App';
import SimpleListComponent from 'container/SimpleListComponent';
import PrivatePage from 'container/PrivatePage';
import LoginPage from 'container/LoginPage';
import privateRoute from 'router/privateRoute';

export default (onLogout) => (
  <Route path="/" name="app" component={App}>
    <IndexRoute component={SimpleListComponent}/>
    <Route path="private" component={privateRoute(PrivatePage)}/>
    <Route path="login" component={LoginPage}/>
    <Route path="logout" onEnter={onLogout}/>
  </Route>
);
