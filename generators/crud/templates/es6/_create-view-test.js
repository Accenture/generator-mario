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

    this.eventSpy = sinon.spy();
    this.view.listenTo(this.view, '<%= featureName %>:createItem', this.eventSpy);
  });

  it('render() should return the view object', () => {
    expect(this.view.render()).to.equal(this.view);
  });

  it('text are should render', () => {
    expect(this.view.render().$('textarea#text')).to.not.equal(null);
  });

  it('author should be of type text', () => {
    expect(this.view.render().$('#author')).to.not.equal(null);
    expect(this.view.render().$('#author').attr('type')).to.equal('text');
  });

  it('created should be of type text', () => {
    expect(this.view.render().$('#created')).to.not.equal(null);
    expect(this.view.render().$('#created').attr('type')).to.equal('text');
  });

  it('click event should trigger spy', () => {
    this.view.$el.find('button.create').trigger('click');
    expect(this.eventSpy.callCount).to.be.equal(1);
  });

});
