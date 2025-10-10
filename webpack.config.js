const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

// Get branch name from environment variable (set by GitHub Actions)
const branch = process.env.GITHUB_REF_NAME || process.env.BRANCH_NAME || 'main';
const isMainBranch = branch === 'main';

// Set publicPath based on branch
// Main branch deploys to root, dev branch deploys to /dev/ subdirectory
const publicPath = isMainBranch ? '/spin-wheel-app/' : `/spin-wheel-app/${branch}/`;

module.exports = {
  entry: './index.web.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: publicPath
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules\/(?!react-native-reanimated|react-native-confetti-cannon|react-native-vector-icons)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              ['@babel/plugin-transform-flow-strip-types'],
              ['@babel/plugin-proposal-object-rest-spread'],
              ['@babel/plugin-transform-runtime']
            ]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|mp3|wav)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/'
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.web.js', '.js', '.web.jsx', '.jsx'],
    alias: {
      'react-native$': 'react-native-web'
    },
    fallback: {
      "process": require.resolve("process/browser"),
      "buffer": require.resolve("buffer"),
      "util": require.resolve("util/"),
      "stream": require.resolve("stream-browserify"),
      "path": require.resolve("path-browserify"),
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    compress: true,
    port: 8080,
    historyApiFallback: true
  }
};
