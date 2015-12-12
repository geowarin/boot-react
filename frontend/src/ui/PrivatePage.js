import React from 'react';
import { connect } from 'react-redux';

export const PrivatePage = (props) => (
  <div>
    <h2>Private page</h2>

    <p>
      Hello, {props.username}
    </p>
  </div>
);

export default connect(
  state => ({username: state.authentication.username})
)(PrivatePage);
