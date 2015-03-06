/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var ItemModel = Backbone.Model.extend({
        idAttribute: 'id',
        defaults: {
            name: 'default name',
            location: 'default location',
            imageSource: 'images/default.jpg'
        }
    });

    return ItemModel;
});