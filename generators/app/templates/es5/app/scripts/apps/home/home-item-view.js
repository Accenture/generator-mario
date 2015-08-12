/*global define*/

define(['marionette', 'templates'], function (Marionette, JST) {
  'use strict';

  return Marionette.ItemView.extend({
    template: JST['app/scripts/apps/home/home-template.hbs']
  });
});
