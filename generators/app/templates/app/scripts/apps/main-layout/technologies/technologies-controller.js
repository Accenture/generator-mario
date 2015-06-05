/*global define*/

'use strict';
define(['./technologies-composite-view'], function (TechnologiesCompositeView) {
    return {
        initialize: function (collection) {
            var technologiesCompositeView = new TechnologiesCompositeView({collection: collection});
            return technologiesCompositeView;
        }
    };
});
