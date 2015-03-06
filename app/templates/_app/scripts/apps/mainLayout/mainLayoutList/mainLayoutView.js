/*global define*/

'use strict';
define([
    'app',
    'marionette',
    'templates'
], function (App, Marionette, JST) {
    var MainLayoutView = Marionette.LayoutView.extend({
        tagName: 'div',
        id: 'overview-layout',
        template: JST['app/scripts/apps/mainLayout/mainLayoutList/mainLayout.hbs'],
        regions: {
            'LocationsRegion': '#mainLayout-locations'
        }
    });
    return MainLayoutView;
});