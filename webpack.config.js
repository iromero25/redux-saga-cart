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
        use: ["ts-loader", "eslint-loader"],
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
    // Note: if we move the  `api.html` file (which doesn't require react per se
    // using this plugin, then loading the page throws  an error at the console:
    // this plugin is meant to be ued by webpack to link an html  file with  the
    // React app, therefore the main react App is loaded when accessing the page

    // new HtmlWebpackPlugin({
    //   template: "./public/api.html",
    //   filename: "api.html",
    // }),
    new CopyPlugin({
      patterns: [
        { from: "public/main.css", to: "main.css" },
        { from: "public/api.html", to: "api.html" },
      ],
    }),
  ],
};

module.exports = config;
