import type { NextConfig } from 'next';

// const LightningCSS = require('lightningcss');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const WebpackBarPlugin = require('webpackbar');

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  output: 'standalone',
  // webpack: (config, { isServer, defaultLoaders, buildId, dev }) => {
  //   // console.log({ isServer, defaultLoaders, buildId, dev });

  //   // config.mode = dev ? 'development' : 'production';

  //   // config.output.library = '_ty';
  //   // config.output.filename = dev ? '[name].js' : '[contenthash].js';
  //   // config.output.hotUpdateMainFilename =
  //   //   '[fullhash].[runtime].hot-update.json';
  //   // config.output.hotUpdateChunkFilename = '[id].[fullhash].hot-update.js';
  //   // config.output.webassemblyModuleFilename = '[contenthash].wasm';
  //   // config.output.asyncChunks = true;
  //   // config.output.crossOriginLoading = 'anonymous';
  //   // config.output.hashFunction = 'xxhash64';
  //   // config.output.hashDigestLength = 16;

  //   // config.devtool = dev ? 'eval-source-map' : false;

  //   config.module.rules.push({
  //     test: /\.css$/,
  //     use: [
  //       MiniCssExtractPlugin.loader,
  //       'css-loader',
  //       {
  //         loader: 'lightningcss-loader',
  //         options: {
  //           implementation: LightningCSS,
  //         },
  //       },
  //     ],
  //   });

  //   // config.plugins.push(
  //   //   new MiniCssExtractPlugin({
  //   //     filename: dev ? '[name].css' : '[contenthash].css',
  //   //   }),
  //   // );
  //   // config.plugins.push(
  //   //   new BundleAnalyzerPlugin({
  //   //     analyzerMode: 'static',
  //   //   }),
  //   // );

  //   // config.plugins.concat([
  //   //   new MiniCssExtractPlugin({
  //   //     filename: dev ? '[name].css' : '[contenthash].css',
  //   //   }),
  //   //   !dev && new CleanWebpackPlugin(),
  //   //   new BundleAnalyzerPlugin({
  //   //     analyzerMode: 'static',
  //   //   }),
  //   //   !dev && new WebpackBarPlugin(),
  //   // ]);

  //   return config;
  // },
};

export default nextConfig;
