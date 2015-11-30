import React from 'react';
import { connect } from 'react-redux';

export const PrivatePage = ({username}) => (
  <div>
    <h2>Private page</h2>

    <p>
      Hello, {username}
    </p>
  </div>
);

export default connect(
  state => ({username: state.authentication.username})
)(PrivatePage);
