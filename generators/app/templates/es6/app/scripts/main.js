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
        underscore: '../bower_components/underscore/underscore',<% if(styles === 'less') { %>
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',<% } else { %>
        bootstrap: '../bower_components/bootstrap-sass/assets/javascripts/bootstrap.min',<% } %>
        handlebars: '../bower_components/handlebars/handlebars.runtime',
        marionette: '../bower_components/backbone.marionette/lib/backbone.marionette',
        radio: '../bower_components/backbone.radio/build/backbone.radio',
        fastclick: '../bower_components/fastclick-amd/fastclick',
        i18n: '../bower_components/i18next/i18next.amd',
        'lil-uuid': '../bower_components/lil-uuid/uuid'
    }
});

require([
  'i18n',
  'helpers/configure',
  'app',
  'bootstrap'
], function(i18n, configureApp, App) {
    configureApp(function() {
      i18n.init({fallbackLng: 'en', debug:true}, function() {
        App.start();
      });
    });
});
