'use strict';

define([
  'app',
  'backbone',
  'marionette',
  'templates'
], function (App, Backbone, Marionette, JST) {
  return Marionette.ItemView.extend({
    template: JST['<%= templatePath %>'],

    events: {
      'click button.remove': 'removeItem',
      'click button.save': 'save'
    },

    removeItem: function (e) {
      e.preventDefault();

      var section = this.$('section');

      App.vent.trigger(App.msg.<%= featureNameUpper %>.REMOVE_ITEM, section.data('id'));
    },

    save: function (e) {
      e.preventDefault();

      var data = _.object(_.map(this.$('form').serializeArray(), _.values));
      this.model.unset('isPublished');
      this.model.set(data);

      App.vent.trigger(App.msg.<%= featureNameUpper %>.NAVIGATE_HOME);
    }
  });
});
