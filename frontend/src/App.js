import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {

  componentDidMount() {
    axios.get('/api/simple')
      .then(res => console.log(res.data))
      .catch(err => console.error(err))
  }

  render() {
    return (
      <h1>Hello, guys.</h1>
    );
  }
}
