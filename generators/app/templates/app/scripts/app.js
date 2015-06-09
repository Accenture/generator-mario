/*global define*/
'use strict';
define(['marionette', 'messages'], function (Marionette, messages) {
    var App = new Marionette.Application();
    App.msg = messages;
    App.addRegions({
        'contentRegion': '#content',
        'navigationRegion': '#navigationTop'
    });
    App.on('start', function () {
        if (Backbone.history) {
            require([
              'apps/main-layout/main-layout-app',
              'helpers/handlebars-helpers',
              'apps/navigation/navigation-app'
            ], function (MainLayout, helpers, NavigationApp) {
              helpers.initialize();
              NavigationApp.showTopBar();
              new MainLayout();

              Backbone.history.start();
            });
        }
    });
    return App;
});
