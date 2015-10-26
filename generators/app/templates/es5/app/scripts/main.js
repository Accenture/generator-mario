'use strict';

require.config({
    wrapShim: true,
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
          deps: [
            'jquery'
          ]
        },
        handlebars: {
            exports: 'Handlebars',
            init: function() {
                this.Handlebars = Handlebars;
                return this.Handlebars;
            }
        },
        'marionette': {
            exports: 'Marionette',
            deps: [
                'backbone'
            ]
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        handlebars: '../bower_components/handlebars/handlebars.runtime',
        marionette: '../bower_components/backbone.marionette/lib/backbone.marionette',
        radio: '../bower_components/backbone.radio/build/backbone.radio',
        fastclick: '../bower_components/fastclick-amd/fastclick'
    }
});

function setupEnvironment(callback) {
  Backbone.$.get('environment.json').done(function(envFile) {
    if (!envFile) { return; }

    var config = envFile[envFile.configuration];
    var origSync = Backbone.sync;

    Backbone.sync = function(method, model, options) {
      options.beforeSend = function() {
        this.url = config.endpoint + this.url;
      };
      return origSync.call(this, method, model, options);
    };

    callback();
  }).fail(function() {
    callback();
  });
}

require([
    'app',
    'bootstrap'
], function(App) {
    setupEnvironment(function() { App.start(); });
});
