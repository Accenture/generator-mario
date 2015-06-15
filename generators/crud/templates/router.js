'use strict';

define([
  'marionette', '<%= controllerPath %>'
], function(Marionette, <%= controllerName %>) {

  return Marionette.AppRouter.extend({
    initialize: function (options) {
      this.controller = new <%= controllerName %>({region: options.region});
    },
    appRoutes: {
      '<%= name %>': 'list',
      '<%= name %>/new': 'create',
      '<%= name %>/:id':'detail'
    }
  });
});
