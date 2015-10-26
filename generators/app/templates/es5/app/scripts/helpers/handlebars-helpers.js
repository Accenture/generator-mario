'use strict';

define(['handlebars', 'i18n'], function (Handlebars, i18n) {

  return {
    initialize: function () {
      Handlebars.registerHelper('formatDate', function (date) {
          if (date) {
              var d = new Date(date);
              return d.toLocaleTimeString() + ' - ' + d.toLocaleDateString();
          } else {
            return 'N/A';
          }
      });

      Handlebars.registerHelper('formatDay', function(date) {
        var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dayName = '';

        if (date) {
          var d = new Date(date);
          dayName = dayNames[d.getDay()];
        }

        return dayName;
      });

      Handlebars.registerHelper('t', function(key) {
        var result = i18n.t(key);
        return new Handlebars.SafeString(result);
      });
    }
  };
});
