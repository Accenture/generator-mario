'use strict';

define([
    'backbone',
    '<%= modelPath %>'
], function (Backbone, <%= modelNameCamelCase %>) {
    'use strict';

    return Backbone.Collection.extend({
        model: <%= modelNameCamelCase %>
    });
});
