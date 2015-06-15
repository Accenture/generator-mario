'use strict';

define(['marionette', 'templates'], function (Marionette, JST) {
  return Marionette.ItemView.extend({
    template: JST['<%= templatePath %>'],
    tagName: 'li',
    className: 'list-group-item clearfix',
    ui: {
      button: 'button.edit'
    },
    triggers: {
      "click @ui.button": '<%= featureName %>:showDetail'
    }
  });
});
