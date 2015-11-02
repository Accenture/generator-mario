<% if(ecma === 6) { %>import App from './app';
import 'bootstrap';<% if(styles === 'less') { %>
import '../styles/main.less';<% } else { %>
import '../styles/main.scss';<% } %>
import i18n from 'i18n';
import configureApp from 'helpers/configure';

configureApp(() => {
  i18n.init({fallbackLng: 'en', debug:true}, () => {
    App.start();
  });
});<% } else { %>'use strict';

require([
  'i18n',
  'helpers/configure',
  'app',
  'bootstrap'
], function(i18n, configureApp, App) {
    configureApp(function() {
      i18n.init({fallbackLng: 'en', debug:true}, function() {
        App.start();
      });
    });
});<% } %>
