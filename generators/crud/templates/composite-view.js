'use strict';

define([
  'backbone',
  'marionette',
  'templates',
  '<%= itemViewPath %>',
], function (Backbone, Marionette, JST, <%= itemViewName %>) {
  return Marionette.CompositeView.extend({
    template: JST['<%= templatePath %>'],
    childView: <%= itemViewName %>,
    childViewContainer: '#item-view-container',
    className: '',
    ui: {
      create: 'button.create'
    },
    triggers: {
      'click @ui.create': '<%= featureName %>:navigateNew'
    },
    collectionEvents: {
      'update': 'render'
    }
  });
});
