'use strict';

define(['app', 'marionette', 'templates'], function (App, Marionette, JST) {
  return Marionette.ItemView.extend({
    template: JST['<%= templatePath %>'],
    tagName: 'li',
    className: 'list-group-item clearfix',

    events: {
      'click button.edit': 'showEdit'
    },

    showEdit: function (e) {
      App.vent.trigger(
        App.msg.<%= featureNameUpper %>.SHOW_DETAIL,
        this.$(e.target).closest('.item').data('id')
      );
    }
  });
});
