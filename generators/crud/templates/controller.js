'use strict';

define([
  'backbone',
  'marionette',
  'handlebars',
  'radio',
  '<%= modelPath %>',
  '<%= collectionPath %>',
  '<%= detailViewPath %>',
  '<%= createViewPath %>',
  '<%= compositeViewPath %>'
], function(
  Backbone,
  Marionette,
  Handlebars,
  Radio,
  <%= modelName %>,
  <%= collectionName %>,
  <%= detailViewName %>,
  <%= createViewName %>,
  <%= compositeViewName %>
) {
  var msg = {};
  msg.CREATE_ITEM = '<%= featureName %>:createItem';
  msg.REMOVE_ITEM = '<%= featureName %>:removeItem';
  msg.SAVE = '<%= featureName %>:save';
  msg.SHOW_DETAIL = 'childview:<%= featureName %>:showDetail';
  msg.NAVIGATE_NEW = '<%= featureName %>:navigateNew';
  msg.CRUD_UPDATE = 'crud-update';

  var feature = {
    name: '<%= featureName %>',
    baseRoute: '#<%= featureName %>'
  };

  return Marionette.Object.extend({
    initialize: function (options) {
      this.collection = new <%= collectionName %>([
        {id: 1, text: 'This is just a sample text', author: 'Sample', created: Date.now(), isPublished: true},
        {id: 2, text: 'This is just an example text', author: 'Example', created: Date.now(), isPublished: false},
        {id: 3, text: 'This is just a mapple text', author: 'Mapple', created: Date.now(), isPublished: true},
        {id: 4, text: 'This is just an apple text', author: 'Apple', created: Date.now(), isPublished: true},
        {id: 5, text: 'This is just an orange text', author: 'Orange', created: Date.now(), isPublished: false}
      ]);

      this.region = options.region;
      this.channel = Radio.channel('sidebar');
      this.channel.trigger(msg.CRUD_UPDATE, {name: feature.name, count: this.collection.length, baseRoute: feature.baseRoute});
    },
    list: function () {
      var view = new <%= compositeViewName %>({collection: this.collection});
      view.listenTo(view, msg.NAVIGATE_NEW, function () {
        Backbone.history.navigate('#<%= featureName %>/new', {trigger: true});
      });
      view.listenTo(view, msg.SHOW_DETAIL, function (args) {
        Backbone.history.navigate('#<%= featureName %>/' + args.model.get('id'), {trigger: true});
      });
      this.region.show(view);
    },
    create: function () {
      var view = new <%= createViewName %>({model: new <%= modelName %>()});
      var that = this;
      view.listenTo(view, msg.CREATE_ITEM, function (model) {
        that.collection.add(model);
        //TODO: model.save();
        that.channel.trigger(msg.CRUD_UPDATE, {name: feature.name, count: that.collection.length, baseRoute: feature.baseRoute});
        Backbone.history.navigate('#<%= featureName %>', {trigger: true});
      });
      this.region.show(view);
    },
    detail: function (id) {
      var view = new <%= detailViewName %>({model: this.collection.get(id)});
      var that = this;
      view.listenTo(view, msg.REMOVE_ITEM, function(args) {
        that.collection.remove(args.model.get('id'));
        that.channel.trigger(msg.CRUD_UPDATE, {name: feature.name, count: that.collection.length, baseRoute: feature.baseRoute});
        Backbone.history.navigate('#<%= featureName %>', {trigger: true});
      });
      view.listenTo(view, msg.SAVE, function(/*args*/) {
        //TODO: model save e.g. args.model.save();
        Backbone.history.navigate('#<%= featureName %>', {trigger: true});
      });
      this.region.show(view);
    }
  });
});
