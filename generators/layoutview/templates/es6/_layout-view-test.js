import <%= viewName %> from '<%= viewPath %>';

describe('<%= viewName %> view', () => {
  let view;
  beforeEach(function () {
    view = new <%= viewName %>();
    view.render();
  });
  it('render() should return the view object', () => {
    expect(view.render()).to.equal(view);
  });

  it('should contain 2 regions', () => {
    expect(view.render().$el.find('div').length).to.equal(2);
  });
});
