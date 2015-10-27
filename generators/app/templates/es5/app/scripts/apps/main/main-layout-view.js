'use strict';

define(['marionette', 'templates'], function (Marionette, JST) {

    return Marionette.LayoutView.extend({
        template: JST['app/scripts/apps/main/main<%= delimiter %>layout<%= delimiter %>view<%= delimiter %>template.hbs'],
        regions: {
            'navigationRegion': '#navigation',
            'sidebarRegion': '#sidebar',
            'contentRegion': '#content'
        },
        el: '#wrapper'
    });
});
