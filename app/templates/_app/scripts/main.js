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
        },
        foundation: {
            deps: [
                'jquery'
            ]
        },
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
        underscore: '../bower_components/underscore/underscore',
        foundation: '../bower_components/foundation/js/foundation',
        handlebars: '../bower_components/handlebars/handlebars.runtime',
        marionette: '../bower_components/backbone.marionette/lib/backbone.marionette'
    }
});

require([
    'app',
    'foundation'
], function (App) {

    App.start();
    $(document).foundation();
});
