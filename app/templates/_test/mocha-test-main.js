/*global mocha*/
'use strict';

require.config({
    baseUrl: '/scripts',

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
        'marionette': {
            exports: 'Marionette',
            deps: [
                'backbone'
            ]
        }
    },

    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        marked: '../bower_components/marked/lib/marked',
        underscore: '../bower_components/underscore/underscore',
        handlebars: '../bower_components/handlebars/handlebars.runtime',
        backbonetouch: '../bower_components/backbone.touch/backbone.touch',
        marionette: '../bower_components/backbone.marionette/lib/backbone.marionette'
    }
});

require([
    'jquery',
    'app',
    'bootstrap'
], function () {
    var specFolder = 'spec/';
    require([
            specFolder + 'appSpec.js'
        ], function () {
            // Start the tests
            mocha.run();
        });
});
