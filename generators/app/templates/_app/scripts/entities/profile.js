/*global define*/

'use strict';
define([
    'app',
    'backbone'
], function (App, Backbone) {
    var API = {
        getModel: function () {
            //dummy profile
            return new Backbone.Model({
                firstName: 'John',
                imageSource: 'images/profile_default.jpg'
            });
        }
    };
    App.reqres.setHandler(App.msg.PROFILE.GET, function () {
        return API.getModel();
    });
});
