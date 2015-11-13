import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

export const App = (props) => {
  var loginLogout = props.isAuthenticated ? <Link to="/logout">logout</Link> : <Link to="/login">login</Link>;
  return (
    <div>
      <div className="menu">
        <Link to="/">Home</Link> { ' | ' }
        {loginLogout} { ' | ' }
        <Link to="/private">private</Link>
      </div>
      {props.children}
    </div>
  );
};

export default connect(
    state => ({isAuthenticated: state.authentication.isAuthenticated})
)(App);
