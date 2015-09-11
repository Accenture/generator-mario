import Backbone from 'backbone';

export default Backbone.Model.extend({
  defaults: {
    name: 'no-name',
    count: 0,
    selected: false,
    baseRoute: '#channels'
  }
});
