const webpack = require('webpack');
const path = require("path");
const TypescriptDeclarationPlugin = require("typescript-declaration-webpack-plugin");

module.exports = {
  mode: "production",
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      // https://github.com/facebook/react/issues/20235
      // https://github.com/facebook/create-react-app/issues/11769
      "react/jsx-dev-runtime": "react/jsx-dev-runtime.js",
      "react/jsx-runtime": "react/jsx-runtime.js",
    },
  },
  externals: {
    react: "commonjs react",
    "react-dom": "commonjs react-dom",
  },
  entry: {
    index: "../src/index_katex.tsx",
  },
  output: {
    libraryTarget: "umd",
    globalObject: "this",
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new TypescriptDeclarationPlugin({}),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        default: false,
      },
    },
    runtimeChunk: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        use: ["ts-loader?configFile=tsconfig.json"],
        exclude: [/node_modules/, /.examples/, /.storybook/, /e2e/],
      },
    ],
  },
};
