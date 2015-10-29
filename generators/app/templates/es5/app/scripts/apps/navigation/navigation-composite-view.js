'use strict';

define([
  'marionette',
  'templates',
  'apps/navigation/navigation<%= delimiter %>item<%= delimiter %>view'
], function (Marionette, JST, NavigationItemView) {

  return Marionette.CompositeView.extend({
    tagName: 'div',
    template: JST['app/scripts/apps/navigation/navigation<%= delimiter %>composite<%= delimiter %>view<%= delimiter %>template.hbs'],
    childView: NavigationItemView,
    childViewContainer: '#lang'
  });
});
