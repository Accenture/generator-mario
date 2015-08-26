'use strict';

define([
  'marionette',
  '<%= childPath %>'
], function (Marionette, <%= childItemView %>) {
  return Marionette.CollectionView.extend({
    childView: <%= childItemView %>
  });
});
