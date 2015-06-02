/*global define*/

define(['marionette', 'templates'], function (Marionette, JST) {
  'use strict';

  return Marionette.ItemView.extend({
    template: JST['<%= dest %>']

});
});

