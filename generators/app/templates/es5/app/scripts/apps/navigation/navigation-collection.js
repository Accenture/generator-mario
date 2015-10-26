'use strict';

define([
    'backbone',
], function (Backbone) {
    return Backbone.Collection.extend({
        url: 'jsondata/navigation-collection.json',
        defaults: {
        }
    });
});
