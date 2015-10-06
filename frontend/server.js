var path = require('path');
var express = require('express');
var webpack = require('webpack');
var request = require('request');
var config = require('./webpack.dev.config');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/api', (req, res) => {
  req.pipe(request('http://localhost:8080/api' + req.url)
    .on('error', (e) => { console.warn(e.message) }))
    .pipe(res);
});
app.use('*', (req, res) => {
  req.pipe(request('http://localhost:3000/index.html')).pipe(res);
});

app.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
