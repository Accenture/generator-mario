'use strict';

define([
  'backbone', 'marionette', '<%= controllerPath %>'
], function(Backbone, Marionette, <%= controllerName %>) {

  return Marionette.AppRouter.extend({
    controller: <%= controllerName %>,

    appRoutes: {
      '<%= name %>': 'list',
      '<%= name %>/new': 'create',
      '<%= name %>/:id':'detail'
    }
  });
});
