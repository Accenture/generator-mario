/*global define*/

'use strict';
define(['apps/mainLayout/location/locationCompositeView'], function (LocationCompositeView) {
    return {
        initialize: function (collection) {
            var locationCompositeView = new LocationCompositeView({collection: collection});
            return locationCompositeView;
        }
    };
});