import Backbone from 'backbone';
import <%= compositeViewName %> from '<%= compositeViewPath %>';
import helpers from 'helpers/handlebars<%= delimiter %>helpers';

describe('<%= compositeViewName %>', function() {
  helpers.initialize();

  beforeEach(() => {
    this.collection = new Backbone.Collection([
      {id: 1, text: 'This is just a sample text', author: 'Sample', created: Date.now(), isPublished: true},
      {id: 2, text: 'This is just an example text', author: 'Example', created: Date.now(), isPublished: false},
    ]);
    this.view = new <%= compositeViewName %>({collection: this.collection});
    this.view.render();

    this.eventSpy = <%=assert.createfakespy%>();
    this.view.listenTo(this.view, '<%= featureName %>:navigateNew', this.eventSpy);
  });

  it('is ok', () => {
    expect(this.collection).<%=assert.tobeok%>;
    expect(this.view).<%=assert.tobeok%>;
  });

  it('contains 2 values', () => {
    expect(this.collection.length).<%=assert.toequal%>(2);
    expect(this.view.$el.find('.list-group > li').length).<%=assert.toequal%>(2);
  });

  it('click event should trigger spy', () => {
    this.view.$el.find('button.create').trigger('click');
    expect(this.eventSpy.<%=assert.callcount%>).<%=assert.toequal%>(1);
  });
});
