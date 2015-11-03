import _ from 'underscore';
import Backbone from 'backbone';
import lil from 'lil-uuid';

/**
 * Pre-configures the app to load environment configuration via an ajax call.
 * Overrides Backbone's ajax proxy to attach x-page-id and x-uniq-id in all requests.
 * Both things need to occure before the app is initialized therefore the interface
 * provides a callback for app initialization.
 *
 * @param callback function containing a call to App.start/other app initialization
 */
export default function configureApp(callback) {
  Backbone.$.get('environment.json').done(function(envFile) {
    if (!envFile) { return; }

    var config = envFile[envFile.configuration];
    var origAjax = Backbone.ajax;

    Backbone.ajax = function(options) {
      // setup pageID & uniqID
      var headers = { 'x-uniq-id': lil.uuid(), 'X-Page-Id': window.location };
      options.headers = _.extend(options.headers || {}, headers);

      // environmentEndpoint
      if (config.endpoint && config.endpoint.indexOf('http') !== 0) {
        options.url = config.endpoint + options.url;
      }

      return origAjax.apply(this, arguments);
    };

    //custom logging (prepared for server side logging)
    window.onerror = function(msg, file, line, col) {
      var date = new Date().toISOString();
      var errorMessage = date + ' - error: ' + msg + ' - file: ' + file + ', line: ' + line + ', col:' + col;
      console.error(errorMessage);
    };

    callback();
  }).fail(function() {
    callback();
  });
}
