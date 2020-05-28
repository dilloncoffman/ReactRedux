const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackBundleAnalyzer = require('webpack-bundle-analyzer');

process.env.NODE_ENV = 'production';

module.exports = {
  mode: 'production',
  target: 'web',
  devtool: 'source-map',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    // plugins enhance webpack's power
    new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new webpack.DefinePlugin({
      // This global makes sure React is built in prod mode
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV), //
      'process.env.API_URL': JSON.stringify('http://localhost:3001'), // now webpack will replace process.env.API_URL anywhere in our code with the URL we've specified here
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/favicon.ico',
      minify: {
        // see https://github.com/kangax/html-minifier#options-quick-reference
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /(\.css)$/,
        use: [
          MiniCssExtractPlugin.loader, // extract CSS to a separate file
          {
            loader: 'css-loader',
            options: {
              sourceMap: true, // generates source map for debugging purposes
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              // eslint-disable-next-line global-require
              plugins: () => [require('cssnano')], // minify CSS, Loaders run from bottom up so postcss-loader will run first
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
