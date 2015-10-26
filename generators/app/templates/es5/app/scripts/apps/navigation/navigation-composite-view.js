'use strict';

define([
  'marionette',
  'templates',
  'apps/navigation/navigation-item-view'
], function (Marionette, JST, NavigationItemView) {

  return Marionette.CompositeView.extend({
    tagName: 'div',
    template: JST['app/scripts/apps/navigation/navigation-composite-view-template.hbs'],
    childView: NavigationItemView,
    childViewContainer: '#lang'
  });
});
