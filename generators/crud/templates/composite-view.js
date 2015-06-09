'use strict';

define([
  'app',
  'backbone',
  'marionette',
  'templates',
  '<%= itemViewPath %>',
], function (App, Backbone, Marionette, JST, <%= itemViewName %>) {
  return Marionette.CompositeView.extend({
    template: JST['<%= templatePath %>'],

    childView: <%= itemViewName %>,
    childViewContainer: '#item-view-container',
    className: '',

    events: {'click button.create': 'showCreate'},

    initialize: function () {
      this.listenTo(this.collection, 'update', this.render);
    },

    showCreate: function () {
      App.vent.trigger(App.msg.<%= featureNameUpper %>.NAVIGATE_NEW);
    }
  });
});
