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

app.use('/api', function(req, res) {
  var url = 'http://localhost:8080/api' + req.url;
  req.pipe(request(url)).pipe(res);
});
app.use('*', function(req, res) {
  var url = 'http://localhost:3000/index.html';
  req.pipe(request(url)).pipe(res);
});

app.listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
