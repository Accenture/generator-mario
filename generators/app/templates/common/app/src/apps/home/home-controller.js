import {Object} from 'marionette';
import HomeItemView from './home-item-view';
import HomeModel from './home-model';

export default Object.extend({
    initialize(options) {
         this.region = options.region;
     },
     default() {
         let model = new HomeModel({name: 'Home'});
         let view = new HomeItemView({model: model});
         this.region.show(view);
     }
});
