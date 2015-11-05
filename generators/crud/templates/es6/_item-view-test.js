import Backbone from 'backbone';
import helpers from 'helpers/handlebars<%= delimiter %>helpers';
import <%= itemViewName %> from '<%= itemViewPath %>';

describe('<%= itemViewName %>', function() {
  helpers.initialize();

  beforeEach(() => {
    this.model = new Backbone.Model({
      text: 'Sample'
    });
    this.view = new <%= itemViewName %>({model: this.model});
    this.view.render();

    this.eventSpy = <%=assert.createfakespy%>();
    this.view.listenTo(this.view, '<%= featureName %>:showDetail', this.eventSpy);
  });

  it('render() should return the view object', () => {
    expect(this.view.render()).<%=assert.toequal%>(this.view);
  });

  it('name should equal Sample', () => {
    expect(this.view.render().$('.text').text()).<%=assert.toequal%>('Sample');
  });

  it('click event should trigger spy', () => {
    this.view.$el.find('button.edit').trigger('click');
    expect(this.eventSpy.<%=assert.callcount%>).<%=assert.toequal%>(1);
  });
});
