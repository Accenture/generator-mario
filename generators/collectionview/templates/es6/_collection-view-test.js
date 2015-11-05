import <%= viewName %> from '<%= viewPath %>';
import {Collection} from 'backbone';

describe('<%= viewName %> view', () => {
  let view;
  beforeEach(() => {
    let collection = new Collection([
      {'message': 'Hello world'},
      {'message': 'How are you?'}
    ]);
    view = new <%= viewName %>({collection: collection});
    view.render();
  });
  it('render() should return the view object', () => {
    expect(view.render()).<%=assert.toequal%>(view);
  });

  it('should contain 2 item views', () => {
    expect(view.render().$el.find('h2').length).<%=assert.toequal%>(2);
  });
});
