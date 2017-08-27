var path = require('path')
var webpack = require('webpack')

var base = {
  // Carousel: './src/js/Carousel.js',
  // GoTop: './src/js/GoTop.js',
  // Waterfall: './src/js/Waterfall.js',
  index: './src/js/index.js'
}

module.exports = {
  entry: base,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '_[name].js'
  },
  resolve: {
    alias: {
      $ : path.resolve(__dirname+ './node_modules/jquery/dist/jquery.min.js')
    }
  },
  module: {
    rules:[
      {
        test: /\.css$/,
        exclude: [
          'node_modules'
        ],
        use: [{
          loader: 'style-loader',
          loader: 'css-loader'
        }]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ]
}