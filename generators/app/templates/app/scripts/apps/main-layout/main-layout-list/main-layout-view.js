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
        template: JST['app/scripts/apps/main-layout/main-layout-list/main-layout-template.hbs'],
        regions: {
            'TechnologiesRegion': '#mainLayout-technologies'
        }
    });
    return MainLayoutView;
});
