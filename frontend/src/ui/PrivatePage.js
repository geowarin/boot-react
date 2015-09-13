import React, { Component } from 'react';
import { connect } from 'react-redux';

export class PrivatePage extends Component {
  render() {
    return (
      <div>
        <h2>Private page</h2>

        <p>
          Hello, {this.props.username}
        </p>
      </div>
    );
  }
}

export default connect(
    state => ({username: state.authentication.username})
)(PrivatePage);
