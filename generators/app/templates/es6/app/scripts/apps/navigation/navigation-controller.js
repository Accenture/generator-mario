import {Object as Obj} from 'marionette';
import NavigationItemView from './navigation<%= delimiter %>composite<%= delimiter %>view';
import NavigationCollection from './navigation<%= delimiter %>collection';
import i18n from 'i18n';

export default Obj.extend({
  initialize(options) {
       this.region = options.region;
       this.show();
   },
   show() {
       let collection = new NavigationCollection();
       collection.fetch();
       let view = new NavigationItemView({collection: collection});
       view.listenTo(view, 'childview:language:click', (data) => {
         i18n.setLng(data.model.get('key'), () => {
           Backbone.history.loadUrl(Backbone.history.fragment);
           view.render();
         });
       });
       this.region.show(view);
   }
});
