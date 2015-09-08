import React from 'react';
import { Route, Redirect } from 'react-router';
import MyComponent from './Component';
import App from './App';

export default (
  <Route name="app" component={App}>
    <Route component={MyComponent} path="/" />
  </Route>
);
