'use strict';

define([
  'marionette', 'templates'
], function (Marionette, JST) {
  return Marionette.LayoutView.extend({
    template: JST['<%= templatePath %>'],

    regions: {
      region1: '#region1',
      region2: '#region2'
    }
  });
});
