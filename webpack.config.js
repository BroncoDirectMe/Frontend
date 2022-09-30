const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    script: './src/Index.tsx',
    content: './src/Content.ts',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'script.js',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './dist'),
    },
  },
  mode: process.env.MODE || 'development',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'], // add .tsx, .ts
  },
};
