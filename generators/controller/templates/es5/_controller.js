'use strict';

define(['marionette'<% items.forEach(function(item){ %>, '<%= item.path %>'<% }); %>], function (Marionette<% items.forEach(function(item){ %>, <%= item.name %><% }); %>) {

  return Marionette.Object.extend({
    initialize: function (options) {
      this.region = options.region;
    },

    default: function() {<% items.forEach(function(item){ %><% if(item.type === 'collection' || item.type === 'model') { %>
      var <%= item.type %> = new <%= item.name %>();<% } else if(item.type === 'itemview'){ %>
      var <%= item.varName %> = new <%= item.name %>({model: model});
      this.region.show(<%= item.varName %>);<% } else if(item.type === 'collectionview'){ %>
      var <%= item.varName %> = new <%= item.name %>({collection: collection});
      this.region.show(<%= item.varName %>);<% } else if(item.type === 'compositeview'){ %>
      var <%= item.varName %> = new <%= item.name %>({model: model, collection: collection});
      this.region.show(<%= item.varName %>);<% }}); %>
    }
  });
});
