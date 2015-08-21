import {AppRouter} from 'marionette';
import <%= controllerName %> from '<%= controllerPath %>';

export default AppRouter.extend({
  initialize(options) {
    this.controller = new <%= controllerName %>({region: options.region});
  },
  appRoutes: {
    '<%= name %>': 'default'
  }
});
