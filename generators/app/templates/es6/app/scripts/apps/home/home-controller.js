import {Object as Obj} from 'marionette';
import HomeItemView from './home<%= delimiter %>item<%= delimiter %>view';
import HomeModel from './home<%= delimiter %>model';

export default Obj.extend({
    initialize(options) {
         this.region = options.region;
     },
     default() {
         let model = new HomeModel({name: 'Home'});
         let view = new HomeItemView({model: model});
         this.region.show(view);
     }
});
