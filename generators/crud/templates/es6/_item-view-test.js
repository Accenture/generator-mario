import <%= itemViewName %> from '<%= itemViewPath %>';

describe('<%= itemViewName %>', function() {
  beforeEach(() => {
    this.model = new Backbone.Model({
      text: 'Sample'
    });
    this.view = new <%= itemViewName %>({model: this.model});
    this.view.render();

    this.eventSpy = sinon.spy();
    this.view.listenTo(this.view, '<%= featureName %>:showDetail', this.eventSpy);
  });

  it('render() should return the view object', () => {
    expect(this.view.render()).to.equal(this.view);
  });

  it('name should equal Sample', () => {
    expect(this.view.render().$('.text').text()).to.equal('Sample');
  });

  it('click event should trigger spy', () => {
    this.view.$el.find('button.edit').trigger('click');
    expect(this.eventSpy.callCount).to.be.equal(1);
  });
});
