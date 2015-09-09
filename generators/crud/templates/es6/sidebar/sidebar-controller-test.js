'use strict';

import Backbone from 'backbone';
import Marionette from 'marionette';
import SidebarController from './sidebar-controller';

const data = {
  name: 'test-feature',
  count: 5,
  baseRoute: '/test'
};

const data2 = {
  name: 'test-feature2',
  count: 10,
  baseRoute: '/test2'
};

describe('WowController', function() {
  beforeEach(() => {
    this.region = new Marionette.Region({el: 'body'});
    this.controller = new SidebarController({region: this.region});
    this.controller.channel.trigger('crud-update', data);

    this.spy = sinon.spy(Backbone.history, 'navigate');
  });

  afterEach(() => {
    this.spy.restore();
  });

  it('should render view', () => {
    expect(this.region.$el.find('ul.nav')).to.be.ok;
    expect(this.region.$el.find('ul.nav').children().length).to.be.equal(1);
  });

  it('should react to item click', () => {
    this.region.$el.find('li').trigger('click');
    expect(this.spy.callCount).to.be.equal(1);
  });

  it('should react to crud update', () => {
    this.controller.channel.trigger('crud-update', data2);
    expect(this.region.$el.find('ul.nav').children().length).to.be.equal(2);
  });

  it('should react to crud update (name) duplicate', () => {
    this.controller.channel.trigger('crud-update', data);
    expect(this.region.$el.find('ul.nav').children().length).to.be.equal(1);
  });
});
