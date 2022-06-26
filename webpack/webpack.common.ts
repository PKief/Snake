import Autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { resolve } from 'path';
import SveltePreprocess from 'svelte-preprocess';
import { Configuration } from 'webpack';

const devMode = process.env.NODE_ENV !== 'production';

const config: Configuration = {
  mode: 'development',
  entry: ['./main.ts'],
  context: resolve(__dirname, '../src'),
  resolve: {
    alias: {
      // Note: Later in this config file, we'll automatically add paths from `tsconfig.compilerOptions.paths`
      svelte: resolve('node_modules', 'svelte'),
    },
    extensions: ['.mjs', '.js', '.ts', '.svelte', 'scss'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'index.js',
    clean: true,
  },
  module: {
    rules: [
      // Rule: Svelte
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              // Dev mode must be enabled for HMR to work!
              dev: devMode,
            },
            emitCss: !devMode,
            hotReload: devMode,
            hotOptions: {
              // List of options and defaults: https://www.npmjs.com/package/svelte-loader-hot#usage
              noPreserveState: false,
              optimistic: true,
            },
            preprocess: SveltePreprocess({
              scss: true,
              sass: true,
              postcss: {
                plugins: [Autoprefixer],
              },
            }),
          },
        },
      },

      // Required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
      // See: https://github.com/sveltejs/svelte-loader#usage
      {
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: 'asset',
      },
    ],
  },
  plugins: [
    // new HotModuleReplacementPlugin(),
    // new FaviconsWebpackPlugin({
    //   logo: './img/logo.png',
    // }),
    new HtmlWebpackPlugin({
      inject: true,
      title: 'Snake',
      hash: true,
      meta: {
        viewport:
          'user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1',
      },
      favicon: 'img/favicon.ico',
    }),
    new MiniCssExtractPlugin(),
  ],
};

export default config;
