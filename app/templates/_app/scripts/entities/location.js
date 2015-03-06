'use strict';
define([
    'app',
    'entities/collections/locationsCollection'
], function (App, LocationsCollection) {
    var API = {
        getCollection: function () {
            var collection = new LocationsCollection();
            collection.fetch();
            return collection;
        }
    };
    App.reqres.setHandler(App.msg.LOCATION.ENTITIES, function () {
        return API.getCollection();
    });
});
