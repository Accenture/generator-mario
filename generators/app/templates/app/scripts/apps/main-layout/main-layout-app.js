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
            require(['apps/main-layout/main-layout-list/main-layout-controller'], function (MainLayoutController) {
                MainLayoutController.showLayout();
            });
        },
        showDetail: function (id) {
            require(['apps/main-layout/main-layout-list/main-layout-controller'], function (MainLayoutController) {
                MainLayoutController.showLayout(id);
            });
        }
    };

    App.addInitializer(function () {
        new MainLayoutRouter({
            controller: API
        });
    });
});
