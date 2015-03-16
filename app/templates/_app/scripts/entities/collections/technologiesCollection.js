/*global define*/

define([
    'app',
    'backbone',
    '../models/technologyModel'
], function (App, Backbone, TechnologyModel) {
    'use strict';

    var TechnologiesCollection = Backbone.Collection.extend({
        model: TechnologyModel,
        url: 'jsondata/itemsCollection.json'
    });
    return TechnologiesCollection;
});
