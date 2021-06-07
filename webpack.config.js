const path = require("path");
const TypescriptDeclarationPlugin = require('typescript-declaration-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: "source-map",
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  entry: {
    home: './src/index.tsx',
  },
  output: {
    libraryTarget: 'umd',
    globalObject: 'this',
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new TypescriptDeclarationPlugin({
    }),
  ],
  module: {
    rules: [
      { test: /\.css$/, loader: 'css-loader' },
      {
        test: /\.(ts|tsx)$/, use: ["ts-loader?configFile=tsconfig.json"],
        exclude: [/node_modules/, /.examples/],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?name=./font/[name].[ext]',
        exclude: [/.examples/],
      },
    ],
  },
};