import {Model} from 'backbone';
import NavigationItemView from 'apps/navigation/navigation-item-view';
import helpers from 'helpers/handlebars-helpers';

helpers.initialize();

describe('NavigationItemView', () => {
    let view;
    before(() => {
        let model = new Model({
            text: 'English'
        });
        view = new NavigationItemView({model: model});
        view.render();
    });
    it('id should equal 1', () => {
        expect(view.$('a').text()).to.equal('English');
    });
});
