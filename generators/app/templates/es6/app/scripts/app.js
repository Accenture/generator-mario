import {Application} from 'marionette';
import Backbone from 'backbone';
import Fastclick from 'fastclick';
import MainLayoutView from './apps/main/main<%= delimiter %>layout<%= delimiter %>view';
import NavigationController from './apps/navigation/navigation<%= delimiter %>controller';
import HomeRouter from './apps/home/home<%= delimiter %>router';
import helpers from './helpers/handlebars<%= delimiter %>helpers';

helpers.initialize();
let App = new Application();
var initializeUI = function () {
       let rootView = new MainLayoutView();
       rootView.render();
       new NavigationController({
           region: rootView.navigationRegion
       });
       new HomeRouter({
           region: rootView.contentRegion
       });
   };
App.on('start', function () {
    initializeUI();
    Fastclick.attach(document.body);
    if (Backbone.history) {
        Backbone.history.start();
    }
});

export default App;
