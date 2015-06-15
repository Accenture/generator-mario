'use strict';

define(['./navigation-item-view'], function (NavigationItemView) {
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


