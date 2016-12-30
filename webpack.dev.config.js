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
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'react-hot!babel?presets[]=react&presets[]=es2015',
        exclude: /(node_modules)/,
      },
    ],
  },
};

module.exports = config;
