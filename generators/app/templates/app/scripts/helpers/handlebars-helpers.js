'use strict';
define(['handlebars'], function (Handlebars) {

  return {
    initialize: function () {
      Handlebars.registerHelper('formatDate', function (date) {
          if (date !== undefined) {
              var d = new Date(date);
              return d.toLocaleTimeString() + ' - ' + d.toLocaleDateString();
          } else {
            return 'N/A';
          }
      });
    }
  };
});
