import React, { Component } from 'react';
import { connect } from 'react-redux';

import login from 'actions/login';

export class LoginPage extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    console.log('submit');
    this.props.dispatch(login());
  }

  render() {
    return (
      <div>
        <h2>Login page</h2>

        <div>
          <input name="login" />
          <input name="password" />

          <input type="button" value="Login" onClick={this.onSubmit} />
        </div>
      </div>
    );
  }
}

export default connect()(LoginPage)
