/*global define*/

'use strict';
define([
    'marionette',
    'app'
], function (Marionette, App) {
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

  return Marionette.AppRouter.extend({
      controller: API,
      appRoutes: {
          '': 'showLayout',
          'item/:id': 'showDetail'
      }
  });

});
