'use strict';

define(['backbone'], function(Backbone) {
  return Backbone.Model.extend({
    defaults: {
      name: 'no-name',
      count: 0,
      selected: false,
      baseRoute: '#channels'
    }
  });
});
