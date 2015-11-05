import Backbone from 'backbone';
import helpers from 'helpers/handlebars<%= delimiter %>helpers';
import <%= createItemViewName %> from '<%= createItemViewPath %>';

describe('<%= createItemViewName %>', function() {
  helpers.initialize();

  beforeEach(() => {
    this.date = Date.now();

    this.model = new Backbone.Model({});

    this.view = new <%= createItemViewName %>({model: this.model});
    this.view.render();

    this.eventSpy = <%=assert.createfakespy%>();
    this.view.listenTo(this.view, '<%= featureName %>:createItem', this.eventSpy);
  });

  it('render() should return the view object', () => {
    expect(this.view.render()).<%=assert.toequal%>(this.view);
  });

  it('text are should render', () => {
    expect(this.view.render().$('textarea#text')).not.<%=assert.toequal%>(null);
  });

  it('author should be of type text', () => {
    expect(this.view.render().$('#author')).not.<%=assert.toequal%>(null);
    expect(this.view.render().$('#author').attr('type')).<%=assert.toequal%>('text');
  });

  it('created should be of type text', () => {
    expect(this.view.render().$('#created')).not.<%=assert.toequal%>(null);
    expect(this.view.render().$('#created').attr('type')).<%=assert.toequal%>('text');
  });

  it('click event should trigger spy', () => {
    this.view.$el.find('button.create').trigger('click');
    expect(this.eventSpy.<%=assert.callcount%>).<%=assert.toequal%>(1);
  });

});
