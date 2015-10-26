'use strict';

var webpack = require('webpack');

module.exports = {
  entry: [
    'main.js'
  ],
  output: {
    path: 'dist/scripts',
    publicPath: '/scripts/',
    filename: 'main.js'
  },
  resolve: {
    modulesDirectories: ['app/bower_components', 'app/scripts', '.tmp/scripts'],
    extensions: ['', '.js'],
    alias: {
      'jquery': 'jquery/dist/jquery.js',
      'underscore': 'underscore/underscore.js',
      'backbone': 'backbone/backbone.js',
      'marionette': 'backbone.marionette/lib/backbone.marionette.js',<% if(styles === 'less') { %>
      'bootstrap': 'bootstrap/dist/js/bootstrap.js',<% } else { %>
      'bootstrap': 'bootstrap-sass/assets/javascripts/bootstrap.js',<% } %>
      'handlebars': 'handlebars/handlebars.js',
      'radio': 'backbone.radio/build/backbone.radio.js',
      'fastclick': 'fastclick-amd/fastclick'
    }
  },
  module: {
    loaders: [
      {<% if(styles === 'less') { %>
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'<% } else { %>
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader'<% }%>
      },
      {
        test: /\.hbs/,
        loader: 'handlebars-loader'
      },
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=image/svg+xml'},
      {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'}<% if (ecma === 6) { %>,
      {test: /\.js$/, exclude: [/bower_components/,/node_modules/], loader: 'babel-loader'}<% } %>
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
