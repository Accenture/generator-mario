import HomeItemView from 'apps/home/home<%= delimiter %>item<%= delimiter %>view';
import {Model} from 'backbone';
import helpers from 'helpers/handlebars<%= delimiter %>helpers';

helpers.initialize();

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
        expect(view.render()).<%=assert.toequal%>(view);
    });
    it('id should equal 1', () => {
        expect(view.render().$('h2').text()).<%=assert.toequal%>('Home');
    });
});
