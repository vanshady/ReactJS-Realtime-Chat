const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname, 'client/src');
const BUILD_DIR = path.resolve(__dirname, 'client/public/js');

const config = {
  entry: APP_DIR + '/app.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel',
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
};

module.exports = config;
