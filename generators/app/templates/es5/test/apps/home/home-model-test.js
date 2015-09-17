'use strict';

define([
  'apps/home/home-model'
], function (HomeModel) {
  describe('HomeModel', function () {
    it('has default values', function () {
      // Create empty note model.
      var model = new HomeModel();
      expect(model).to.be.ok;
    });
  });
});
