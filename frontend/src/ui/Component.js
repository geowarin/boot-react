import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

@connect(state => ({
  counter : state.counter
}))
class MyComponent extends Component {

  static propTypes = {
    dispatch : React.PropTypes.func.isRequired,
    counter  : React.PropTypes.number.isRequired
  };

  //componentDidMount() {
  //  axios.get('/api/simple')
  //    .then(res => console.log(res.data))
  //    .catch(err => console.error(err))
  //}

  // normally you'd import an action creator, but I don't want to create
  // a file that you're just going to delete anyways!
  _increment () {
    this.props.dispatch({ type : 'COUNTER_INCREMENT' });
  }

  render() {
    return (
      <div>
        <h1>Hello, guys.</h1>
        <h2>Sample Counter: {this.props.counter}</h2>
        <button onClick={this._increment.bind(this)}>
          Increment
        </button>
      </div>
    );
  }
}

export default MyComponent;
