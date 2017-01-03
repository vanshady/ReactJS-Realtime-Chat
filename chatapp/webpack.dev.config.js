const webpack = require('webpack');
const path = require('path');

const CLIENT_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'public/js');

const config = {
  entry: CLIENT_DIR + '/index.jsx',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      components: path.resolve(CLIENT_DIR, 'components'),
      reducers: path.resolve(CLIENT_DIR, 'reducers'),
      actions: path.resolve(CLIENT_DIR, 'actions'),
    },
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
