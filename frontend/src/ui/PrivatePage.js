import React from 'react';
import { connect } from 'react-redux';

import Translate from 'react-translate-component';

export const PrivatePage = ({username}) => (
  <div>
    <Translate component="h2" content="private.title" />

    <Translate component="p" content="private.greeting" name={username} />
  </div>
);

export default connect(
  ({authentication}) => ({username: authentication.username})
)(PrivatePage);
