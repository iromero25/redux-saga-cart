const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const outputPath = path.resolve(__dirname, "dist");

const config = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "eval-source-map",
  entry: "./index.tsx",
  output: {
    path: outputPath,
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "public/main.css", to: "main.css" }],
    }),
  ],
};

module.exports = config;
