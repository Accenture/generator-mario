/*global define*/

'use strict';
define([
    'app',
    'apps/mainLayout/mainLayoutList/mainLayoutView',
    'apps/mainLayout/location/locationsController'
], function (App, MainLayoutView, LocationsController) {
    var MainLayoutController = {
        showLayout: function () {
            var that = this;
            require(['entities/location'], function () {
                that.locations = App.request(App.msg.LOCATION.ENTITIES);

                var locationsCompositeView = LocationsController.initialize(that.locations);
                locationsCompositeView.onBeforeRender = function () {
                    console.log('Runs before view is rendered'); //good for pre-filtering what is viewed
                };

                that.mainLayoutView = new MainLayoutView();
                that.mainLayoutView.onDomRefresh = function () {
                    this.LocationsRegion.show(locationsCompositeView);
                };

                App.contentRegion.show(that.mainLayoutView);
            });
        },
        showDetail:function(id){
            var  model = this.locations.get(id);

            console.log(model.toJSON());
            console.log('Not done yet'); //TODO: implement detail view, then 'App.contentRegion.show(detailView(model))'
        }
    };
    return MainLayoutController;
});