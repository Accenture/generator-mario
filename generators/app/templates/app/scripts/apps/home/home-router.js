'use strict';

define([
  'backbone', 'marionette', './home-controller'
], function(Backbone, Marionette, homeController) {

  return Marionette.AppRouter.extend({
    initialize: function(options) {
        this.controller = new homeController({region: options.region});
    },

    appRoutes: {
      '*path': 'default'
    }

  });
});
