'use strict';

define([
  '<%= collectionPath %>'
], function (<%= collectionNameCamelCase %>) {
  describe('<%= collectionNameCamelCase %>', function () {
    it('has default values', function () {
      // Create empty note model.
      var collection = new <%= collectionNameCamelCase %>();
      expect(collection).to.be.ok;
    });
  });
});
