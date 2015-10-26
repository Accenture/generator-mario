'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'helpers/handlebars-helpers',
  'apps/navigation/navigation-item-view'
], function ($, _, Backbone, helpers, NavigationItemView) {
  helpers.initialize();

  describe('NavigationItemView', function () {
    before(function () {
      this.model = new Backbone.Model({
        text: 'English'
      });
      this.view = new NavigationItemView({model: this.model});
      this.view.render();
    });
    it('id should equal 1', function () {
      expect(this.view.$('a').text()).to.equal('English');
    });
  });
});
