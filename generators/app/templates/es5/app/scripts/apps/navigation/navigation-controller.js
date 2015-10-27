'use strict';

define(['backbone', 'marionette', 'i18n', './navigation<%= delimiter %>composite<%= delimiter %>view', './navigation<%= delimiter %>collection'],
  function (Backbone, Marionette, i18n, NavigationItemView, NavigationCollection) {
    return Marionette.Object.extend({
        initialize: function(options) {
            this.region = options.region;
            this.show();

        },
        show: function () {
            var collection = new NavigationCollection();
            collection.fetch();
            var view = new NavigationItemView({collection: collection});
            view.listenTo(view, 'childview:language:click', function(data) {
              i18n.setLng(data.model.get('key'), function() {
                Backbone.history.loadUrl(Backbone.history.fragment);
                view.render();
              });
            });
            this.region.show(view);
        }
    });
});
