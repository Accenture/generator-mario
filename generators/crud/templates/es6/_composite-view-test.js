import <%= compositeViewName %> from '<%= compositeViewPath %>';
import helpers from 'helpers/handlebars-helpers';

describe('<%= compositeViewName %>', function() {
  helpers.initialize();

  beforeEach(() => {
    this.collection = new Backbone.Collection([
      {id: 1, text: 'This is just a sample text', author: 'Sample', created: Date.now(), isPublished: true},
      {id: 2, text: 'This is just an example text', author: 'Example', created: Date.now(), isPublished: false},
    ]);
    this.view = new <%= compositeViewName %>({collection: this.collection});
    this.view.render();

    this.eventSpy = sinon.spy();
    this.view.listenTo(this.view, '<%= featureName %>:navigateNew', this.eventSpy);
  });

  it('is ok', () => {
    expect(this.collection).to.be.ok;
    expect(this.view).to.be.ok;
  });

  it('contains 2 values', () => {
    expect(this.collection).to.have.length(2);
    expect(this.view.$el.find('.list-group > li')).to.have.length(2);
  });

  it('click event should trigger spy', () => {
    this.view.$el.find('button.create').trigger('click');
    expect(this.eventSpy.callCount).to.be.equal(1);
  });
});
