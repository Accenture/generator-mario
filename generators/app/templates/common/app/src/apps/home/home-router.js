import {AppRouter} from 'marionette';
import HomeController from './home-controller';

export default AppRouter.extend({
  initialize(options) {
      this.controller = new HomeController({region: options.region})
  },
  appRoutes: {
    '*path': 'default'
  }
})
