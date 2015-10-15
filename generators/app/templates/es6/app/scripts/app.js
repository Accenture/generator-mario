import {Application} from 'marionette';
import Backbone from 'backbone';
import Fastclick from 'fastclick';
import MainLayoutView from './apps/main/main-layout-view';
import NavigationController from './apps/navigation/navigation-controller';
import HomeRouter from './apps/home/home-router';
import helpers from './helpers/handlebars-helpers';

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
