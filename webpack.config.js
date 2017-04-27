var path = require('path');
var webpack = require('webpack');

var config = {
  entry: [
    path.join(__dirname, 'src', 'main')
  ],
  output: {
    publicPath: '/assets/',
    path: path.join(__dirname, 'gui'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
       test: /\.vue$/,
       loader: 'vue-loader'
     }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  devServer: {
    inline: true,
    hot: true,
    port: 5555,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        secure: false
      }
    },
    contentBase: './gui'
  }
}

module.exports = config;
