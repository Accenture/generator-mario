'use strict';

define([
  'app',
  'backbone',
  'marionette',
  'handlebars',
  '<%= modelPath %>',
  '<%= collectionPath %>',
  '<%= detailViewPath %>',
  '<%= createViewPath %>',
  '<%= compositeViewPath %>'
], function(
  App,
  Backbone,
  Marionette,
  Handlebars,
  <%= modelName %>,
  <%= collectionName %>,
  <%= detailViewName %>,
  <%= createViewName %>,
  <%= compositeViewName %>
) {

  //Prefilled data
  var collection = new <%= collectionName %>([
    {id: 1, text: 'This is just a sample text', author: 'Martin', created: Date.now(), isPublished: true},
    {id: 2, text: 'This is just an example text', author: 'Lukas', created: Date.now(), isPublished: false},
    {id: 3, text: 'This is just a mapple text', author: 'Pavol', created: Date.now(), isPublished: true},
    {id: 4, text: 'This is just an apple text', author: 'Dominika', created: Date.now(), isPublished: true},
    {id: 5, text: 'This is just an orange text', author: 'Slavomir', created: Date.now(), isPublished: false}
  ]);

  (function initialize() {
    App.msg.<%= featureNameUpper %> = {};
    App.msg.<%= featureNameUpper %>.CREATE_ITEM = '<%= featureName %>:createItem';
    App.msg.<%= featureNameUpper %>.REMOVE_ITEM = '<%= featureName %>:removeItem';
    App.msg.<%= featureNameUpper %>.NAVIGATE_HOME = '<%= featureName %>:navigateHome';
    App.msg.<%= featureNameUpper %>.NAVIGATE_NEW = '<%= featureName %>:navigateNew';
    App.msg.<%= featureNameUpper %>.SHOW_DETAIL = '<%= featureName %>:showDetail';

    App.vent.on(App.msg.<%= featureNameUpper %>.CREATE_ITEM, function (model) {
      collection.add(model);
      Backbone.history.navigate('#<%= featureName %>', {trigger: true});
    });

    App.vent.on(App.msg.<%= featureNameUpper %>.REMOVE_ITEM, function (id) {
      collection.remove(id);
      Backbone.history.navigate('#<%= featureName %>', {trigger: true});
    });

    App.vent.on(App.msg.<%= featureNameUpper %>.NAVIGATE_HOME, function () {
      Backbone.history.navigate('#<%= featureName %>', {trigger: true});
    });

    App.vent.on(App.msg.<%= featureNameUpper %>.SHOW_DETAIL, function (id) {
      Backbone.history.navigate('#<%= featureName %>/' + id, {trigger: true});
    });

    App.vent.on(App.msg.<%= featureNameUpper %>.NAVIGATE_NEW, function () {
      Backbone.history.navigate('#<%= featureName %>/new', {trigger: true});
    });
  })();

  return {
    list: function() {
      var compositeView = new <%= compositeViewName %>({collection: collection});
      App.contentRegion.show(compositeView);
    },

    create: function () {
      var createView = new <%= createViewName %>({model: new <%= modelName %>()});
      App.contentRegion.show(createView);
    },

    detail: function (id) {
      var detailView = new <%= detailViewName %>({model: collection.get(id)});
      App.contentRegion.show(detailView);
    }
  };
});
