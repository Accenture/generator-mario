'use strict';

define([
  'backbone',
  'marionette',
  './navigation-controller',
], function (Backbone, Marionette, NavigationController) {
  describe('NavigationController', function () {
    beforeEach(function () {
      this.region = new Marionette.Region({el: 'body'});
      this.controller = new NavigationController({region: this.region});
    });

    it('should render view', function () {
      expect(this.region.$el.find('div.navbar')).to.be.ok;
    });

  });
});
