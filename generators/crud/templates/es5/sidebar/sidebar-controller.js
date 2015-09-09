'use strict';

define([
  'backbone',
  'marionette',
  'radio',
  './sidebar-collection-view',
  './sidebar-collection',
  './sidebar-model'
], function (Backbone, Marionette, Radio, SidebarCollectionView, SidebarCollection, SidebarModel) {

  return Marionette.Object.extend({
    initialize: function (options) {
      this.region = options.region;
      this.channel = Radio.channel('sidebar');

      var collection = new SidebarCollection();

      var view = new SidebarCollectionView({collection: collection});

      this.listenTo(view, 'childview:sidebar-item:clicked', function (view, model) {
        Backbone.history.navigate(model.get('baseRoute'), {trigger: true});
      });

      this.listenTo(this.channel, 'crud-update', function (modelData) {
        var model = collection.findWhere({name: modelData.name});

        if (model) {
          model.set('count', modelData.count);
        } else {
          collection.add(new SidebarModel(modelData));
        }
      });

      this.region.show(view);
    }
  });
});
