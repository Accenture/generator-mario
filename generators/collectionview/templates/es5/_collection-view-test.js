'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  '<%= viewPath %>'
], function ($, _, Backbone, <%= viewName %>) {

  describe('<%= viewName %> view', function () {
    beforeEach(function () {
      this.collection = new Backbone.Collection([
        {'message': 'Hello world'},
        {'message': 'How are you?'}
      ]);
      this.view = new <%= viewName %>({collection: this.collection});
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
