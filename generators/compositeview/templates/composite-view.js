'use strict';
define([
  'app',
  'marionette',
  'templates',
  '<%= childPath %>'
], function (App, Marionette, JST, <%= childItemView %>) {

  return Marionette.CompositeView.extend({
    tagName: 'div',
    template: JST['<%= template %>'],
    childView: <%= childItemView %>,
    childViewContainer: '#itemView'
  });
});
