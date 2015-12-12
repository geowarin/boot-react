import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replacePath } from 'redux-simple-router';

export const PrivatePage = (props) => {
  const {authentication} = props;
  if (authentication.loading) {
    return (<div>Loading...</div>)
  }

  if (!authentication.isAuthenticated) {
    props.replacePath('login');
    return <div></div>
  }

  return (
    <div>
      <h2>Private page</h2>

      <p>
        Hello, {authentication.username}
      </p>
    </div>
  )
};

export default connect(
  state => ({authentication: state.authentication}),
  {replacePath}
)(PrivatePage);
