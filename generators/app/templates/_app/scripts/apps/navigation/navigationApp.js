/*global define*/

'use strict';
define([
    'marionette',
    'app'
], function (Marionette, App) {
    var API = {
        showTopBar: function () {
            require(['apps/navigation/topBar/topBarController'], function (TopBarController) {
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