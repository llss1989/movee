const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`);

const optimization = () => {
  const configObj = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    configObj.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return configObj;
};

const plugins = () => {
  const basePlugins = [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `./css/${filename('css')}`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/assets'), to: path.resolve(__dirname, 'app') },
      ],
    }),
  ];

  if (isProd) {
    basePlugins.push(
      new ImageminPlugin({
        bail: false, // Ignore errors on corrupted images
        cache: true,
        imageminOptions: {
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 5 }],
            [
              'svgo',
              {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                ],
              },
            ],
          ],
        },
      }),
    );
  }

  return basePlugins;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './js/main.js',
  output: {
    filename: `./js/${filename('js')}`,
    path: path.resolve(__dirname, 'app'),
    publicPath: '',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'app'),
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  optimization: optimization(),
  plugins: plugins(),
  devtool: isProd ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          // could replace the next line with "style-loader" here for inline css
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          // according to the docs, sass-loader should be at the bottom, which
          // loads it first to avoid prefixes in your sourcemaps and other issues.
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: `./img/${filename('[ext]')}`,
          },
        }],
      },
      {
        test: /\.(?:|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: `./fonts/${filename('[ext]')}`,
          },
        }],
      },
    ],
  },
};
