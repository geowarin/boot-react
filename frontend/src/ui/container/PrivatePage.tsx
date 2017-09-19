import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { RootState } from '../../config/store';
import { FormattedMessage, Messages } from 'react-intl';

interface PrivatePageProps {
  username: string;
  messages: Messages;
}

class PrivatePage extends React.Component<PrivatePageProps, {}> {
  render() {
    const { messages, username } = this.props;

    return (
      <div>
        <h2>
          <FormattedMessage
            {...messages['private.title']}
          />
        </h2>
        <p>
          <FormattedMessage
            {...messages['private.greeting']}
            values={{ name: username }}
          />
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: PrivatePageProps): PrivatePageProps => {
  return {
    username: state.authentication.username || '',
    messages: state.intl.messages
  };
};

export default connect(mapStateToProps)(PrivatePage);
