import Backbone from 'backbone';
import Marionette from 'marionette';
import SidebarController from 'apps/sidebar/sidebar<%= delimiter %>controller';

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

    this.spy = <%=assert.createrealspy%>(Backbone.history, 'navigate');
  });
<% if (testFramework === 'mocha') { %>  afterEach(() => {
    this.spy.restore();
  });<% } %>
  it('should render view', () => {
    expect(this.region.$el.find('ul.nav')).<%=assert.tobeok%>;
    expect(this.region.$el.find('ul.nav').children().length).<%=assert.toequal%>(1);
  });

  it('should react to item click', () => {
    this.region.$el.find('li').trigger('click');
    expect(this.spy.<%=assert.callcount%>).<%=assert.toequal%>(1);
  });

  it('should react to crud update', () => {
    this.controller.channel.trigger('crud-update', data2);
    expect(this.region.$el.find('ul.nav').children().length).<%=assert.toequal%>(2);
  });

  it('should react to crud update (name) duplicate', () => {
    this.controller.channel.trigger('crud-update', data);
    expect(this.region.$el.find('ul.nav').children().length).<%=assert.toequal%>(1);
  });
});
