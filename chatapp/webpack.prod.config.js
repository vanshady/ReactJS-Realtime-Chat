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
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: [
            'react',
            'es2015',
          ],
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
      compress: {
        warnings: false,
        drop_console: true,
      },
      comments: false,
    }),
  ],
};


module.exports = config;
