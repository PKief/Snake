import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { resolve } from "path";
import {
  Configuration,
  HotModuleReplacementPlugin,
  ProvidePlugin,
} from "webpack";
const devMode = process.env.NODE_ENV !== "production";

const config: Configuration = {
  mode: "development",
  entry: ["./main.js"],
  context: resolve(__dirname, "../src"),
  resolve: {
    extensions: ["", ".js", ".scss"],
  },
  output: {
    path: resolve(__dirname, "../dist"),
    filename: "index.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: "asset",
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      Hammer: "hammerjs/hammer",
    }),
    new FaviconsWebpackPlugin({
      // Your source logo (required)
      logo: "./img/logo.png",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      title: "Snake",
      template: `index.ejs`,
      hash: true,
      meta: {
        viewport:
          "user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1",
      },
      favicon: "img/favicon.ico",
    }),
    new MiniCssExtractPlugin(),
  ],
};

export default config;
