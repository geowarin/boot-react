import * as React from 'react';
import { Messages, FormattedMessage } from 'react-intl';

export interface ListComponentProps {
  wasSuccessfull: boolean;
  items: string[];
  fetchSimple: () => { types: string[]; promise: (client: any) => any; };
  messages: Messages;
}

export default class ListComponent extends React.Component<ListComponentProps, {}> {
  render() {
    const { items, wasSuccessfull, messages } = this.props;
    const list = items.map((item, index) => <li key={index}>{item}</li>);

    return (
      <div>
        <h2>Data:</h2>
        {wasSuccessfull ?
          <ul>
            {list}
          </ul> :
          <p><FormattedMessage {...messages['simple.no-items']} /></p>}
        <button onClick={this.props.fetchSimple}>
          Fetch
        </button>
      </div>
    );
  }
}
