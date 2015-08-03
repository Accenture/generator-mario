'use strict';

define([
  'marionette',
  './sidebar-item-view'
], function (Marionette, SidebarItemView) {
  return Marionette.CollectionView.extend({
    childView: SidebarItemView,
    tagName: 'ul',
    className: 'nav nav-pills nav-stacked',

    initialize: function () {
      this.listenTo(this.collection, 'change', this.render);
    }
  });
});
