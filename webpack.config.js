const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
    library: 'ReactCookieLaw',
    libraryTarget: 'umd',
  },
  target: 'node',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  externals: {
    react: 'react',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
  ],
  optimization: {
    minimize: true,
  },
};
