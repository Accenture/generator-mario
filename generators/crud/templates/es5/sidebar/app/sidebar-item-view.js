'use strict';

define(['marionette', 'templates'], function (Marionette, JST) {

  return Marionette.ItemView.extend({
    tagName: 'li',
    className: '',
    template: JST['app/scripts/apps/sidebar/sidebar-item-view-template.hbs'],
    events: {
      'click': 'clickHandler'
    },

    clickHandler: function () {
      this.trigger('sidebar-item:clicked', this.model);
    }
  });
});
