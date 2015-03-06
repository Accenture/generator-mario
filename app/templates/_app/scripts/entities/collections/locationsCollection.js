/*global define*/

define([
    'app',
    'backbone',
    'entities/models/locationModel'
], function (App, Backbone, LocationModel) {
    'use strict';

    var LocationsCollection = Backbone.Collection.extend({
        model: LocationModel,
        url: 'jsondata/itemsCollection.json'
    });
    return LocationsCollection;
});