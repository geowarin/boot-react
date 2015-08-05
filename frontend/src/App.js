import React, { Component } from 'react';
import 'whatwg-fetch';

export default class App extends Component {

  componentDidMount() {
    fetch('/api/simple')
      .then(res => {
        return res.json()
      })
      .then(res => {
        console.log(res)
      });
  }

  render() {
    return (
      <h1>Hello, guys.</h1>
    );
  }
}
