const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");

const build_dir = __dirname + '/dist/'
const template_dir = __dirname + '/../extension/'

module.exports = {
  entry: './src/background.js',
  entry: {
    'background': './src/background.js',
    'options': './src/options/main.js'
  },
  output: {
    path: build_dir,
    filename: "[name].js",
    clean: true
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "babel-loader",
      //   },
      // },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: template_dir, to: build_dir }
      ]
    }),
    new VueLoaderPlugin(),
  ],
  // resolve: {
  //   alias: {
  //     vue$: "vue/dist/vue.runtime.esm.js",
  //   },
  //   extensions: ["*", ".js", ".vue", ".json"],
  // },
  optimization: {
    minimize: false,
  }
};
