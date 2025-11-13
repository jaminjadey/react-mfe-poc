const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    publicPath: "http://localhost:3001/",
    clean: true
  },
  devServer: {
    port: 3001,
    headers: { "Access-Control-Allow-Origin": "*" }
  },
  resolve: { extensions: [".jsx", ".js"] },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/ }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "module_a",
      filename: "remoteEntry.js",
      exposes: { "./Page": "./src/Page.jsx" },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false }
      }
    }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, "public/index.html") })
  ]
};
