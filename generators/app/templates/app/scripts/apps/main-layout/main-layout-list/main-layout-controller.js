/*global define*/

'use strict';
define([
    'app',
    './main-layout-view',
    '../technologies/technologies-controller'
], function (App, MainLayoutView, TechnologiesController) {
    var MainLayoutController = {
        showLayout: function () {
            var that = this;
            require(['entities/technology'], function () {
                that.technologies = App.request(App.msg.TECHNOLOGY.ENTITIES);

                var technologiesCompositeView = TechnologiesController.initialize(that.technologies);
                technologiesCompositeView.onBeforeRender = function () {
                    console.log('Runs before view is rendered'); //good for pre-filtering what is viewed
                };

                that.mainLayoutView = new MainLayoutView();
                that.mainLayoutView.onDomRefresh = function () {
                    this.TechnologiesRegion.show(technologiesCompositeView);
                };

                App.contentRegion.show(that.mainLayoutView);
            });
        },
        showDetail:function(id){
            var  model = this.technologies.get(id);

            console.log(model.toJSON());
            console.log('Not done yet'); //TODO: implement detail view, then 'App.contentRegion.show(detailView(model))'
        }
    };
    return MainLayoutController;
});
