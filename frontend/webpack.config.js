var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var jeet = require('jeet');
var nib = require('nib');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks(module, count) {
        return (
          module.resource &&
          module.resource.indexOf(path.resolve('node_modules')) === 0
        )
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Boot React',
      template: path.join(__dirname, 'assets/index-template.html')
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: true,
      compressor: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('styles.css'),

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
      // Was:
      //  extensions: ['', '.js'],
      //  root: path.join(__dirname, 'src')
  },
  module: {
    loaders: [
        {
            enforce: 'pre',
            test: /\.css$/,
            loader: 'stripcomment-loader'
        },
        {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader"
        },
        {
          test: /\.tsx?$/,
          include: path.join(__dirname, 'src'),          
          loader: ['babel-loader', 'awesome-typescript-loader']
        },
        {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract('css-loader!stylus-loader')
        },
        {
            test: /\.json/,
            loaders: ['json-loader']
        }
    ]
  }
};
