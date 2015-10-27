'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'apps/sidebar/sidebar<%= delimiter %>collection<%= delimiter %>view'
], function ($, _, Backbone, SidebarCollectionView) {

  describe('SidebarCollectionView view', function () {
    beforeEach(function () {
      this.collection = new Backbone.Collection([
        {name: 'Sample', count: 20},
        {name: 'Example', count: 30}
      ]);
      this.view = new SidebarCollectionView({collection: this.collection});
      this.view.render();
    });
    it('render() should return the view object', function () {
      expect(this.view.render()).to.equal(this.view);
    });

    it('should contain 2 item views', function () {
      expect(this.view.render().$el.find('li').length).to.equal(2);
    });

  });
});
