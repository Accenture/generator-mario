/*global define*/

define(['marionette', 'templates'], function (Marionette, JST) {
    'use strict';

    return Marionette.LayoutView.extend({
        template: JST['app/scripts/apps/main/main-layout-view-template.hbs'],
        regions: {
            'contentRegion': '#content',
            'navigationRegion': '#navigation'
        },
        el: '#wrapper'
    });
});

