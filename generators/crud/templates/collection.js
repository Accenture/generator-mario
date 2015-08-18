'use strict';

define([
    'backbone',
    '<%= modelPath %>'
], function (Backbone, <%= modelName %>) {
    return Backbone.Collection.extend({
        model: <%= modelName %>,
        url: '<%= jsonUrl %>'
    });
});
