'use strict';

define(['marionette'], function (Marionette) {

  return Marionette.Object.extend({
    initialize: function (options) {
      this.region = options.region;
    },
    default: function () {
      console.log('<%= name %>');
      //TODO: Implement functionality
      var view = null;
      this.region.show(view);

    }
  });
});


