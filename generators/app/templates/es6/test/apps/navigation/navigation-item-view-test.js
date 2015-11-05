import {Model} from 'backbone';
import NavigationItemView from 'apps/navigation/navigation<%= delimiter %>item<%= delimiter %>view';
import helpers from 'helpers/handlebars<%= delimiter %>helpers';

helpers.initialize();

describe('NavigationItemView', () => {
    let view;
    beforeEach(() => {
        let model = new Model({
            text: 'English'
        });
        view = new NavigationItemView({model: model});
        view.render();
    });
    it('id should equal 1', () => {
        expect(view.$('a').text()).<%=assert.toequal%>('English');
    });
});
