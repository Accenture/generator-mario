'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'apps/sidebar/sidebar<%= delimiter %>item<%= delimiter %>view'
], function ($, _, Backbone, SidebarItemView) {

  describe('SidebarItemView', function () {
    beforeEach(function () {
      this.model = new Backbone.Model({
        name: 'Sample',
        count: 20
      });
      this.view = new SidebarItemView({model: this.model});
      this.view.render();
    });

    it('render() should return the view object', function () {
      expect(this.view.render()).<%=assert.toequal%>(this.view);
    });
    it('name should equal Sample', function () {
      expect(this.view.render().$('.text-capitalize').text()).<%=assert.toequal%>('Sample');
    });
    it('count should equal 20', function () {
      expect(this.view.render().$('.badge.pull-right').text()).<%=assert.toequal%>('20');
    });
  });
});
