'use strict';

define([
    'backbone',
    '<%= modelPath %>'
], function (Backbone, <%= modelNameCamelCase %>) {
    return Backbone.Collection.extend({
        model: <%= modelNameCamelCase %>
    });
});
