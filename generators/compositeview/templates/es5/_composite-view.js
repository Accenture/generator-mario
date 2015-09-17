'use strict';

define([
  'marionette',
  'templates',
  '<%= childPath %>'
], function (Marionette, JST, <%= childItemView %>) {

  return Marionette.CompositeView.extend({
    tagName: 'div',
    template: JST['<%= template %>'],
    childView: <%= childItemView %>,
    childViewContainer: '#itemView'
  });
});
