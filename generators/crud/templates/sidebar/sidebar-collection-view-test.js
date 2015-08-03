'use strict';
define([
  'jquery',
  'underscore',
  'backbone',
  './sidebar-collection-view'
], function ($, _, Backbone, SidebarCollectionView) {

  describe('SidebarCollectionView view', function () {
    beforeEach(function () {
      this.collection = new Backbone.Collection([
        {'message': 'Hello world'},
        {'message': 'How are you?'}
      ]);
      this.view = new SidebarCollectionView({collection: this.collection});
      this.view.render();
    });
    it('render() should return the view object', function () {
      expect(this.view.render()).to.equal(this.view);
    });

    it('should contain 2 item views', function () {
      expect(this.view.render().$el.find('h2').length).to.equal(2);
    });


  });
});
