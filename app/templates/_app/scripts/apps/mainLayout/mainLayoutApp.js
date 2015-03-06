/*global define*/

'use strict';
define([
    'marionette',
    'app'
], function (Marionette, App) {
    var MainLayoutRouter = Marionette.AppRouter.extend({
        appRoutes: {
            '': 'showLayout',
            'item/:id': 'showDetail'
        }
    });
    var API = {
        showLayout: function () {
            require(['apps/mainLayout/mainLayoutList/mainLayoutController'], function (MainLayoutController) {
                MainLayoutController.showLayout();
            });
        },
        showDetail: function (id) {
            require(['apps/mainLayout/mainLayoutList/mainLayoutController'], function (MainLayoutController) {
                MainLayoutController.showLayout(id);
                //TODO: Implement above method
            });
        }
    };

    App.addInitializer(function () {
        new MainLayoutRouter({
            controller: API
        });
    });
});