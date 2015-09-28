'use strict';

define([
  'marionette',
  'templates',
  'underscore'
], function (Marionette, JST, _) {
  return Marionette.ItemView.extend({
    template: JST['<%= templatePath %>'],
    ui: {
      remove: 'button.remove',
      save: 'button.save'
    },
    triggers: {
      'click @ui.remove': '<%= featureName %>:removeItem'
    },
    events: {
      'click @ui.save': 'save'
    },
    save: function (e) {
      e.preventDefault();
      var data = _.object(_.map(this.$('form').serializeArray(), _.values));
      this.model.unset('isPublished');
      this.model.set(data);
      this.trigger('<%= featureName %>:save', {view: this, model: this.model});
    }
  });
});
