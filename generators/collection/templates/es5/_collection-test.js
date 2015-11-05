'use strict';

define([
  '<%= collectionPath %>'
], function (<%= collectionNameCamelCase %>) {
  describe('<%= collectionNameCamelCase %>', function () {
    it('has default values', function () {
      var collection = new <%= collectionNameCamelCase %>();
      expect(collection).<%=assert.tobeok%>;
    });
  });
});
