<% if(ecma === 6) { %>import App from './app';
import 'bootstrap';
import '../styles/main.less';

App.start();<% } else { %>'use strict';

require([
  'app',
  'bootstrap',
  '../styles/main.less'
], function(App) {
  App.start();
});<% } %>
