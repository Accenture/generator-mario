/*global require, Handlebars*/
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
        },<% if (foundation) { %>
        foundation: {
            deps: [
                'jquery'
            ]
        },<% } %><% if (bootstrap) { %>
        bootstrap: {
          deps: [
            'jquery'
          ]
        },<% } %>
        handlebars: {
            exports: 'Handlebars',
            init: function () {
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
        underscore: '../bower_components/underscore/underscore',<% if (foundation) { %>
        foundation: '../bower_components/foundation/js/foundation',<% } %><% if (bootstrap) { %>
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',<% } %>
        handlebars: '../bower_components/handlebars/handlebars.runtime',
        marionette: '../bower_components/backbone.marionette/lib/backbone.marionette'
    }
});

require([
    'app',<% if (foundation) { %>
    'foundation'<% } %><% if (bootstrap) { %>
    'bootstrap'<% } %>
], function (App) {

    App.start();<% if (foundation) { %>
    $(document).foundation();<% } %>
});
