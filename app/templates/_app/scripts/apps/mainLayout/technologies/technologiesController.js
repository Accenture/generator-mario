/*global define*/

'use strict';
define(['./technologiesCompositeView'], function (TechnologiesCompositeView) {
    return {
        initialize: function (collection) {
            var technologiesCompositeView = new TechnologiesCompositeView({collection: collection});
            return technologiesCompositeView;
        }
    };
});
