import {Collection, history} from 'backbone';
import {Region} from 'marionette';
import helpers from 'helpers/handlebars<%= delimiter %>helpers';
import <%= controllerName %> from '<%= controllerPath %>';

const dummyData = [{
  'text': 'This is just a sample text',
  'author': 'Sample',
  'created': 1439545097459,
  'isPublished': true
}];

describe('<%= controllerName %>', function() {
  helpers.initialize();
  
  beforeEach(() => {
    this.stub = sinon.stub(Collection.prototype, 'fetch')
      .yieldsTo('success', dummyData);

    this.region = new Region({el: 'body'});
    this.controller = new <%= controllerName %>({region: this.region});
    this.controller.collection = new Collection(dummyData);
    this.cid = this.controller.collection.models[0].cid;

    this.spy = sinon.spy(history, 'navigate');
  });

  afterEach(() => {
    this.spy.restore();
    this.stub.restore();
  });

  it('list method should render view', () => {
    this.controller.list();
    expect(this.region.$el.find('#item-view-container')).to.be.ok;
  });

  it('list method should react to create click', () => {
    this.controller.list();
    this.region.$el.find('button.create').trigger('click');
    expect(this.spy.callCount).to.be.equal(1);
  });

  it('list method should react to edit click', () => {
    this.controller.list();
    this.region.$el.find('button.edit').trigger('click');
    expect(this.spy.callCount).to.be.equal(1);
  });

  it('create method should render view', () => {
    this.controller.create();
    expect(this.region.$el.find('form')).to.be.ok;
  });

  it('create method should react to create click', () => {
    this.controller.create();
    this.region.$el.find('button.create').trigger('click');
    expect(this.spy.callCount).to.be.equal(1);
  });

  it('detail method should render view', () => {
    this.controller.detail();
    expect(this.region.$el.find('form')).to.be.ok;
  });

  it('detail method should react to save click', () => {
    this.controller.detail(this.cid);

    this.region.$el.find('button.save').trigger('click');
    expect(this.spy.callCount).to.be.equal(1);
  });

  it('detail method should react to remove click', () => {
    this.controller.detail(this.cid);

    this.region.$el.find('button.remove').trigger('click');
    expect(this.spy.callCount).to.be.equal(1);
  });

});
