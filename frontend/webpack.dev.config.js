var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var jeet = require('jeet');
var nib = require('nib');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Boot React',
      template: path.join(__dirname, 'assets/index-template.html')
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            stylus: {
                use: [jeet(), nib()]
            }
        }
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: [__dirname, 'node_modules', 'src']
  },
  module: {
    loaders: [
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [
          path.join(__dirname, 'node_modules/intl-relativeformat'),
          path.join(__dirname, 'node_modules/intl-messageformat-parser'),
          path.join(__dirname, 'node_modules/intl-format-cache')
        ]
      },
      {
        test: /\.tsx?$/,
        include: path.join(__dirname, 'src'),      
        loader: ['babel-loader?cacheDirectory', 'awesome-typescript-loader']
      },
      {
        test: /\.styl$/,
        loaders: ['style-loader', 'css-loader', 'stylus-loader']
      }, {
        test: /\.json/,
        loaders: ['json-loader']
      }
    ]
  }
};
