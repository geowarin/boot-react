import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import getSessionInfo from 'actions/getSessionInfo'

export default class App extends Component {

  render() {
    return (
      <div>
        <div className="menu">
          <Link to="/">Home</Link> { ' | ' }
          <Link to="/login">login</Link> { ' | ' }
          <Link to="/logout">logout</Link> { ' | ' }
          <Link to="/private">private</Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}
