import React from 'react';
import { connect } from 'react-redux';

import Translate from 'react-translate-component';

export const PrivatePage = ({username}) => (
  <div>
    <h2>Private page</h2>
    <p>
      <Translate content="example.greeting" name={username} />
    </p>
  </div>
);

export default connect(
  ({authentication}) => ({username: authentication.username})
)(PrivatePage);
