import React, {Component} from 'react';
import {connect} from 'react-redux';

import Translate from 'react-translate-component';

export class PrivatePage extends Component {

  render() {
    return (
      <div>
        <Translate component="h2" content="private.title"/>

        <Translate component="p" content="private.greeting" name={this.props.username}/>
      </div>
    )
  }
}

export default connect(
  ({authentication}) => ({username: authentication.username})
)(PrivatePage);
