'use strict';

define(['marionette'<%items.forEach(function(item){%>,'<%= item.path %>'<%});%>], function (Marionette <%items.forEach(function(item){%>,<%= item.name %><%});%>) {

  return Marionette.Object.extend({
    initialize: function (options) {
      this.region = options.region;
      <%items.forEach(function(item){%>
      <%if(item.type == 'collection' || item.type == 'model') { %>this.<%= item.type %> = new <%= item.name %>();
      <% } else if(item.type == 'itemview'){ %>this.<%= item.varName %> = new <%= item.name %>({model:this.model});
      <% } else if(item.type == 'collectionview'){ %>this.<%= item.varName %> = new <%= item.name %>({collection:this.collection});
      <% } else if(item.type == 'compositeview'){ %>this.<%= item.varName %> = new <%= item.name %>({model:this.model, collection:this.collection});<%}});%>
    }
  });
});
