import {AppRouter} from 'marionette';
import HomeController from './home<%= delimiter %>controller';

export default AppRouter.extend({
  initialize(options) {
      this.controller = new HomeController({region: options.region});
  },
  appRoutes: {
    '*path': 'default'
  }
});
