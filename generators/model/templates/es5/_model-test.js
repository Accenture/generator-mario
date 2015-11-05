'use strict';

define([
  '<%= modelPath %>'
], function (<%= modelName %>) {
  describe('<%= modelName %>', function () {
    it('has default values', function () {
      // Create empty note model.
      var model = new <%= modelName %>();
      expect(model).<%=assert.tobeok%>;
    });
  });
});
