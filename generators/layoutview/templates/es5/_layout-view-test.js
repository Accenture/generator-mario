'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  '<%= viewPath %>'
], function ($, _, Backbone, <%= viewName %>) {

  describe('<%= viewName %> view', function () {
    beforeEach(function () {
      this.view = new <%= viewName %>();
      this.view.render();
    });
    it('render() should return the view object', function () {
      expect(this.view.render()).<%=assert.toequal%>(this.view);
    });<% if(!templateExists) { %>

    it('should contain 2 regions', function () {
      expect(this.view.render().$el.find('div').length).<%=assert.toequal%>(2);
    });<% } %>
  });
});
