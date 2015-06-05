/*global define*/

define(['app', './top-bar-view', 'backbone'], function (App, TopBarView) {
    'use strict';
    return {
        showTopBar: function () {
            require(['entities/profile'], function () {
                var profile = App.request(App.msg.PROFILE.GET);
                App.navigationRegion.show(new TopBarView({model: profile}));
            });
        }
    };
});
