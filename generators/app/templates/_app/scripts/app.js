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
            require(['apps/mainLayout/mainLayoutApp', 'helpers/handlebarsHelpers', 'apps/navigation/navigationApp'], function () {
                Backbone.history.start();
            });
        }
    });
    return App;
});
