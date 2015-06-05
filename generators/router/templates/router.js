'use strict';

define([
  'backbone', 'marionette', '<%= controllerPath %>'
], function(Backbone, Marionette, <%= controllerName %>) {

  return Marionette.AppRouter.extend({
    controller: <%= controllerName %>,

    appRoutes: {
      '<%= name %>': 'default'
    }

  });
});
