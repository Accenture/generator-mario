import {Object} from 'marionette';

export default Object.extend({
  initialize(options) {
    this.region = options.region;
  },
  default() {
    console.log('<%= name %>');
    //TODO: Implement functionality
    let view = null;
    this.region.show(view);
  }
});
