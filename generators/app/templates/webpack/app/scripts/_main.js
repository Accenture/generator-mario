<% if(ecma === 6) { %>import App from './app';
import 'bootstrap';<% if(styles === 'less') { %>
import '../styles/main.less';<% } else { %>
import '../styles/main.scss';<% } %>

setupEnvironment(function() { App.start(); });<% } else { %>'use strict';

require([
    'app',
    'bootstrap',<% if(styles === 'less') { %>
    '../styles/main.less'<% } else { %>
    '../styles/main.scss'<% } %>
], function(App) {
  setupEnvironment(function() { App.start(); });
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
