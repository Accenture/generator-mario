import HomeItemView from 'apps/home/home-item-view';
import {Model} from 'backbone';

describe('HomeItemView', () => {
    let view;
    beforeEach(() => {
        let model = new Model({
            name: 'Home'
        });
        view = new HomeItemView({model: model});
        view.render();
    });

    it('render() should return the view object', () => {
        expect(view.render()).to.equal(view);
    });
    it('id should equal 1', () => {
        expect(view.render().$('h2').text()).to.equal('Home');
    });
});
