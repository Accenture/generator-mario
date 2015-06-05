/*global define*/

'use strict';
define([
    'marionette',
    'app'
], function (Marionette, App) {
    var API = {
        showTopBar: function () {
            require(['apps/navigation/top-bar/top-bar-controller'], function (TopBarController) {
                TopBarController.showTopBar();
            });
        }
    };
    App.commands.setHandler('topBar:show', function () {
        API.showTopBar();
    });

    App.addInitializer(function () {
        API.showTopBar();
    });
});
