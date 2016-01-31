import React, {Component} from 'react';

export default class ListComponent extends Component {
  render() {
    var items = this.props.items;
    var list = items.map((item, index) => <li key={index}>{item}</li>);

    return (
      <div>
        <h2>Data:</h2>
        <ul>
          {list}
        </ul>
        <button onClick={this.props.fetchSimple}>
          Fetch
        </button>
      </div>
    );
  }
}
