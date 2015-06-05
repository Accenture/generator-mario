'use strict';
define([
    'app',
    './collections/technologies-collection'
], function (App, TechnologiesCollection) {
    var API = {
        getCollection: function () {
            var collection = new TechnologiesCollection();
            collection.fetch();
            return collection;
        }
    };
    App.reqres.setHandler(App.msg.TECHNOLOGY.ENTITIES, function () {
        return API.getCollection();
    });
});
