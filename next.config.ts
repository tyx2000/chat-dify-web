import type { NextConfig } from 'next';

// const LightningCSS = require('lightningcss');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const WebpackBarPlugin = require('webpackbar');

const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

const cspHeader = `
  default-src 'self';
  script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-inline' https: http:;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  output: 'standalone',
  async headers() {
    return [
      // {
      //   source: '/(.*)',
      //   headers: [
      //     {
      //       key: 'Content-Security-Policy',
      //       value: cspHeader.replace(/\n/g, ''),
      //     },
      //   ],
      // },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\s{2,}/g, ' ').trim(),
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; chatset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ];
  },
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
