'use strict';
define([
  'app',
  'marionette',
  'templates',
  '<%= itemview %>'
], function (App, Marionette, JST, ItemView) {

  return Marionette.CompositeView.extend({
    tagName: 'div',
    template: JST['<%= template %>'],
    childView: ItemView,
    childViewContainer: '#itemView'
  });
});
