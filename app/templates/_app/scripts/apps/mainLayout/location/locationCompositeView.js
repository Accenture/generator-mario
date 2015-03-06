/*global define*/

'use strict';
define([
    'app',
    'marionette',
    'templates',
    'apps/mainLayout/location/locationItemView'
], function (App, Marionette, JST, LocationItemView) {
    return  Marionette.CompositeView.extend({
        tagName: 'div',
        template: JST['app/scripts/apps/mainLayout/location/locationCompositeViewTemp.hbs'],
        childView: LocationItemView,
        childViewContainer: '#locationsItemView'
    });
});