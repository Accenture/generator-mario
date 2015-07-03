'use strict';

define([
  'backbone', 'marionette', '<%= controllerPath %>'
], function(Backbone, Marionette, <%= controllerName %>) {

  return Marionette.AppRouter.extend({
    initialize: function(options) {
      this.controller = new <%= controllerName %>({region: options.region});
    },
    appRoutes: {
      '<%= name %>': 'default'
    }
  });
});
