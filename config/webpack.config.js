const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebPackPlugin = require("html-webpack-plugin");

dotenv.config({ path: './config/env' });

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  mode: 'development',
  module: {
    rules : [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            configFile:"./config/babel.config.json"
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    htmlPlugin,
    new webpack.DefinePlugin({
       'process.env': JSON.stringify(process.env)
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
  }
};
