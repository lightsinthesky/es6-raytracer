var webpack = require('webpack');

module.exports = {
  entry: {
    client : './src/index'
  },
  worker : {
    output : {
      publicPath: "/dist/",
      filename: "hash.worker.js",
      chunkFilename: "[id].hash.worker.js"
    }
  },
  output: {
    publicPath: "/dist/",
    path: __dirname + '/dist/',
    filename: 'build.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
        { test: /\.js$/, loader: '6to5-loader'}
    ]
  }
};

