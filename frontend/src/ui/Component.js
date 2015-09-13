import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchResource from 'actions/fetchResource';

export class MyComponent extends Component {
  static propTypes = {
    fetchResource: React.PropTypes.func.isRequired,
    items: React.PropTypes.array.isRequired
  };

  fetch() {
    this.props.fetchResource();
  }

  render() {
    var items = this.props.items;
    var list = items.map((item, index) => <li key={index}>{item}</li>);

    return (
      <div>
        <h2>Data:</h2>
        <ul>
          {list}
        </ul>
        <button onClick={this.fetch.bind(this)}>
          Fetch
        </button>
      </div>
    );
  }
}

export default connect(
    state => ({items: state.simple.items}),
    dispatch => (bindActionCreators({ fetchResource }, dispatch))
)(MyComponent);
