<% if(ecma === 6) { %>import App from './app';
import 'bootstrap';<% if(styles === 'less') { %>
import '../styles/main.less';<% } else { %>
import '../styles/main.scss';<% } %>
import i18n from 'i18n';

setupEnvironment(() => {
  i18n.init({fallbackLng: 'en', debug:true}, () => {
    App.start();
  });
});<% } else { %>'use strict';

require([
    'app',
    'i18n',
    'bootstrap',<% if(styles === 'less') { %>
    '../styles/main.less'<% } else { %>
    '../styles/main.scss'<% } %>
], function(App, i18n) {
  setupEnvironment(function() {
    i18n.init({fallbackLng: 'en', debug:true}, function() {
      App.start();
    });
  });
});<% } %>

function setupEnvironment(callback) {
  Backbone.$.get('environment.json').done(function(envFile) {
    if (!envFile) { return; }

    var config = envFile[envFile.configuration];
    var origSync = Backbone.sync;

    Backbone.sync = function(method, model, options) {
      options.beforeSend = function() {
        this.url = config.endpoint + this.url;
      };
      return origSync.call(this, method, model, options);
    };

    callback();
  }).fail(function() {
    callback();
  });
}
