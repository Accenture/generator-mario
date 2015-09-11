'use strict';

define([
  'backbone',
  'marionette',
  'apps/sidebar/sidebar-controller',
], function (Backbone, Marionette, SidebarController) {
  var data = {
    name: 'test-feature',
    count: 5,
    baseRoute: '/test'
  };

  var data2 = {
    name: 'test-feature2',
    count: 10,
    baseRoute: '/test2'
  };

  describe('WowController', function () {
    beforeEach(function () {
      this.region = new Marionette.Region({el: 'body'});
      this.controller = new SidebarController({region: this.region});
      this.controller.channel.trigger('crud-update', data);

      this.spy = sinon.spy(Backbone.history, 'navigate');
    });

    afterEach(function() {
      this.spy.restore();
    });

    it('should render view', function () {
      expect(this.region.$el.find('ul.nav')).to.be.ok;
      expect(this.region.$el.find('ul.nav').children().length).to.be.equal(1);
    });

    it('should react to item click', function () {
      this.region.$el.find('li').trigger('click');
      expect(this.spy.callCount).to.be.equal(1);
    });

    it('should react to crud update', function () {
      this.controller.channel.trigger('crud-update', data2);
      expect(this.region.$el.find('ul.nav').children().length).to.be.equal(2);
    });

    it('should react to crud update (name) duplicate', function () {
      this.controller.channel.trigger('crud-update', data);
      expect(this.region.$el.find('ul.nav').children().length).to.be.equal(1);
    });

  });
});
