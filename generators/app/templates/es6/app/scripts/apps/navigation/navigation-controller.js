import {Object} from 'marionette';
import NavigationItemView from './navigation-item-view';

export default Object.extend({
  initialize(options) {
       this.region = options.region;
       this.show();
   },
   show() {
       let view = new NavigationItemView();
       this.region.show(view);
   }
});
