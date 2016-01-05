var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'docs/www');
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/index.jsx'),
    path.join(nodeModulesPath, 'react-ui-library/src/index.js')
  ],
  resolve: {
    extensions: ["", ".js", ".jsx", ".html", ".json"],
    alias: {
      'react-18n': path.resolve(__dirname + '/src'),
      'react-ui-library': path.join(nodeModulesPath, 'react-ui-library/src')
    },
    modulesDirectories: [
      'node_modules',
      path.join(nodeModulesPath, 'react-ui-library/node_modules')
    ]
  },
  devServer: {
    contentBase: 'docs/www',
    devtool: 'eval',
    hot: true,
    inline: true,
    port: 3002
  },
  devtool: 'eval',
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new WebpackBuildNotifierPlugin({
      logo: path.resolve(buildPath, 'images/favicon.png'),
      suppressSuccess: true,
      suppressWarning: true,
      activateTerminalOnError: false
    })
  ],
  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      loader: 'eslint-loader',
      include: [path.resolve(__dirname, "src/app")],
      exclude: [nodeModulesPath]
    }],
    loaders: [{
      test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf/,
      loader: "file?name=[path][name].[ext]",
      exclude: [nodeModulesPath]
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }, {
      test: /\.(js|jsx)$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loaders: ['json-loader']
    }]
  },
  eslint: {
    configFile: '.eslintrc'
  }
};