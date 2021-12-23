const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: { babelrc: true }
          },
          {
            loader: "ts-loader",
            options: { appendTsSuffixTo: [/\.vue$/] }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
       //     options: { hmr: !env.production } // ????????
          },
          'css-loader'
        ]
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: template_dir, to: build_dir }
      ]
    }),
    new HtmlWebpackPlugin({
      template: './public/options.html',
      filename: 'options.html',
      excludeChunks: ['background'],
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(
    //   {
    //   filename: '[name].css'
    // }
    ),
  ],
  
  optimization: {
    minimize: false,
  }
};
