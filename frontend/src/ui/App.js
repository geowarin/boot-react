import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import 'stylus/main.styl';

const TopMenu = (props) => {
  const items = props.items.map((item,key) => (
    <li key={key} className="pure-menu-item">
      <Link to={item.link} className="pure-menu-link">{item.label}</Link>
    </li>
  ));
  return (
    <div className="pure-menu pure-menu-horizontal">
      <ul className="pure-menu-list">
        {items}
      </ul>
    </div>
  );
};

export const App = (props) => {

  const menuItems = [
    {label: 'Home', link: '/'},
    props.isAuthenticated ? {label: 'Logout', link: '/logout'} : {label: 'Login', link: '/login'},
    {label: 'Private page', link: '/private'}
  ];

  return (
    <div id="application">
      <TopMenu items={menuItems} />
      {props.children}
    </div>
  );
};

export default connect(
  state => ({isAuthenticated: state.authentication.isAuthenticated})
)(App);
