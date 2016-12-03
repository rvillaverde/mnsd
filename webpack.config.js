var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './index.js',

  output: {
    path: path.resolve(__dirname + '/dist/'),
    // esto es para webpack-dev-server
    publicPath: '/dist/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.json$/, loader: "json" },
      { test: /\.less$/, loaders:['style','css?-url','less'] },
    ]
  },

  devServer: {
    historyApiFallback: true
  }
}
