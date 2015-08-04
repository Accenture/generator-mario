var webpack = require('webpack');

module.exports = {
  entry: [
    'main.js'
  ],
  output: {
    path: 'dist/scripts',
    publicPath: '/scripts/',
    filename: 'main.js',
  },
  resolve: {
    modulesDirectories: ['app/bower_components', 'app/scripts', '.tmp/scripts'],
    extensions: ['', '.js'],
    alias: {
      'jquery': 'jquery/dist/jquery.js',
      'underscore': 'underscore/underscore.js',
      'backbone': 'backbone/backbone.js',
      'marionette':  'backbone.marionette/lib/backbone.marionette.js',
      'bootstrap':  'bootstrap/dist/js/bootstrap.js',
      'handlebars': 'handlebars/handlebars.js'
    }
  },
  module: {
    loaders: [
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.hbs/,
        loader: 'handlebars-loader'
      },
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=image/svg+xml'},
      {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'}
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      _: 'underscore',
      Backbone: 'backbone',
      Marionette: 'backbone.marionette'
    })
  ]
};
