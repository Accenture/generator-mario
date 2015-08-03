'use strict';

define([
    'backbone',
    './sidebar-model'
], function (Backbone, SidebarModel) {
    return Backbone.Collection.extend({
        model: SidebarModel
    });
});
