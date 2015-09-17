'use strict';

define([
    'backbone',
    'marionette',
    'helpers/handlebars-helpers',
    'apps/main/main-layout-view',
    'apps/navigation/navigation-controller',
    'apps/home/home-router'
], function(
    Backbone,
    Marionette,
    helpers,
    MainLayoutView,
    NavigationController,
    HomeRouter
) {
    helpers.initialize();
    var App = new Marionette.Application();

    var initializeUI = function() {
        var rootView = new MainLayoutView();
        rootView.render();
        new NavigationController({
            region: rootView.navigationRegion
        });
        new HomeRouter({
            region: rootView.contentRegion
        });
    };

    App.on('start', function() {
        initializeUI();
        if (Backbone.history) {
            Backbone.history.start();
        }
    });

    return App;
});
