/*global define*/

define([
    'app',
    'backbone',
    '../models/technology-model'
], function (App, Backbone, TechnologyModel) {
    'use strict';

    var TechnologiesCollection = Backbone.Collection.extend({
        model: TechnologyModel,
        url: 'jsondata/items-collection.json'
    });
    return TechnologiesCollection;
});
