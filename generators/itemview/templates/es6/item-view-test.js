import  <%= view %> from '<%= dest %>';
import {Model} from 'backbone';

describe('<%= view %>', () =>  {
  let view;
  beforeEach(() =>  {
    let model = new Model({
      id: 'Home'
    });
    view = new <%= view %>({model : model});
    view.render();
  });

  it('render() should return the view object', () =>  {
    expect(view.render()).to.equal(view);
  });
  it('id should equal 1', () =>  {
    expect(view.render().$('h2').text()).to.equal('Home');
  });
});
