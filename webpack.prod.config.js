var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './index.js',

  output: {
    path: path.resolve(__dirname + '/dist/'),
    // esto es para webpack-dev-server
    publicPath: '/dist/',
    filename: 'bundle.js'
  },

  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],

  module: {
    loaders: [
      { test: /\.json$/, loader: "json" },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style','css?-url!postcss!less?rootpath=./dist/')
      },
    ]
  },

  devServer: {
    historyApiFallback: true
  }
}
