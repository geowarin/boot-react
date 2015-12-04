import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSimple } from 'reducers/simple';

export class MyComponent extends React.Component {
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
  };
}

export default connect(
    state => ({items: state.simple.items}),
    { fetchSimple }
)(MyComponent);
