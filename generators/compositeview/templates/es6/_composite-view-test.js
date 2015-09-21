import {Collection} from 'backbone';
import <%= viewName %> from '<%= compview %>';

describe('<%= viewName %>', () => {
  let view;
  beforeEach(() => {
    let collection = new Collection([
      {id: 1, name: 'joe doe'},
      {id: 2, name: 'bigus doeus'}
    ]);

    view = new <%= viewName %> ({collection: collection});
    view.render();
  });

  it('Render() should return the view object', () => {
    expect(view.render()).to.equal(view);
  });<% if(!templateExists) { %>

  it('should render 2 items', () => {
    expect(view.render().$el.find('#itemView').children().length).to.equal(2);
  });<% } %>
});
