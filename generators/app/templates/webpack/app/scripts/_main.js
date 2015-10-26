<% if(ecma === 6) { %>import App from './app';
import 'bootstrap';
import '../styles/main.less';

setupEnvironment(function() { App.start(); });<% } else { %>'use strict';

require([
  'app',
  'bootstrap',
  '../styles/main.less'
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
