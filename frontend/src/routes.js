import React from 'react';
import { Route, Redirect } from 'react-router';
import MyComponent from './ui/Component';
import App from './ui/App';

export default (
  <Route name="app" component={App}>
    <Route component={MyComponent} path="/" />
  </Route>
);
