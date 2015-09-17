'use strict';

define(['handlebars'], function (Handlebars) {

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
    }
  };
});
