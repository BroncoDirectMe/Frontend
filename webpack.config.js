const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    script: './src/Index.tsx',
    content: './src/Content.tsx',
  },
  entry: {
    script: './src/Index.tsx',
    content: './src/Content.tsx',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './dist'),
      directory: path.resolve(__dirname, './dist'),
    },
  },
  mode: process.env.MODE || 'development',
  mode: process.env.MODE || 'development',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'public' }],
      patterns: [{ from: 'public' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.css'],
  },
};
