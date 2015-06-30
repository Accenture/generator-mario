'use strict';

define(['marionette', './navigation-item-view'], function (Marionette, NavigationItemView) {
    return Marionette.Object.extend({
        initialize: function(options) {
            this.region = options.region;
            this.show();

        },
        show: function () {
            var view = new NavigationItemView();
            this.region.show(view);
        }
    });
});


