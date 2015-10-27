'use strict';

define([
    'backbone',
    './sidebar<%= delimiter %>model'
], function (Backbone, SidebarModel) {
    return Backbone.Collection.extend({
        model: SidebarModel
    });
});
