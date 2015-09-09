import Marionette from 'marionette';
import <%= controllerName %> from '<%= controllerPath %>';

export default Marionette.AppRouter.extend({
  initialize(options) {
    this.controller = new <%= controllerName %>({region: options.region});
  },
  appRoutes: {
    '<%= name %>': 'list',
    '<%= name %>/new': 'create',
    '<%= name %>/:id':'detail'
  }
});
