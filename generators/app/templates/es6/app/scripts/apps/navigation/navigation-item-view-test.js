import {Model} from 'backbone';
import NavigationItemView from './navigation-item-view';

describe('NavigationItemView', () => {
    let view;
    beforeEach(() => {
        let model = new Model({
            id: '1'
        });
        view = new NavigationItemView({model: model});
        view.render();
    });

    it('render() should return the view object', () => {
        expect(view.render()).to.equal(view);
    });
    it('id should equal 1', () => {
        expect(view.render().$('h2').text()).to.equal('');
    });
});
