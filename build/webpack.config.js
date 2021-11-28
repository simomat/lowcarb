const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const build_dir = __dirname + '/dist/'
const template_dir = __dirname + '/../extension/'

module.exports = {
  entry: './src/background.js',
  entry: {
    'background': './src/background.js',
    'options': './src/options/options.js'
  },
  output: {
    path: build_dir,
    filename: "[name].js",
    clean: true
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: template_dir, to: build_dir }
      ]
    })
  ],
  optimization: {
    minimize: false,
  }
};
