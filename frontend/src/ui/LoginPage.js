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
    this.state = {};
  }

  onSubmit() {
    console.log('submit');
    this.props.dispatch(login(this.state.username, this.state.password));
  }

  render() {
    return (
      <div>
        <h2>Login page</h2>

        <div>
          <input name="username" onChange={this.updateUsername.bind(this)} />
          <input name="password" onChange={this.updatePassword.bind(this)} />

          <input type="button" value="Login" onClick={this.onSubmit} />
        </div>
      </div>
    );
  }

  updateUsername(e){
    this.setState({username: e.target.value});
  }

  updatePassword(e){
    this.setState({password: e.target.value});
  }
}

export default connect()(LoginPage);
