'use strict';

define([
  'underscore',
  'app/scripts/app',
  'backbone',
  'marionette',
  'templates'
], function (_, App, Backbone, Marionette, JST) {
  return Marionette.ItemView.extend({
    template: JST['<%= templatePath %>'],

    events: {
      'click button.create': 'createItem'
    },

    initialize: function () {
      this.model.set('created', Date.now());
    },

    createItem: function (e) {
      e.preventDefault();

      var data = _.object(_.map(this.$('form').serializeArray(), _.values));
      this.model.set(data);

      this.trigger('<%= featureName %>:createItem', this.model);
    }
  });
});
