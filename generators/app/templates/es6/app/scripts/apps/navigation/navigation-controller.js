import {Object as Obj} from 'marionette';
import NavigationItemView from './navigation-item-view';

export default Obj.extend({
  initialize(options) {
       this.region = options.region;
       this.show();
   },
   show() {
       let view = new NavigationItemView();
       this.region.show(view);
   }
});
