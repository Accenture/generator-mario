import Handlebars from 'handlebars';
import i18n from 'i18n';

export default {
  initialize() {
    Handlebars.registerHelper('formatDate', date => {
      if (date !== undefined) {
          let d = new Date(date);
          return d.toLocaleTimeString() + ' - ' + d.toLocaleDateString();
      } else {
        return 'N/A';
      }
    });

    Handlebars.registerHelper('formatDay', date => {
      var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var dayName = '';

      if (date) {
        var d = new Date(date);
        dayName = dayNames[d.getDay()];
      }

      return dayName;
    });

    Handlebars.registerHelper('t', key => {
      var result = i18n.t(key);
      return new Handlebars.SafeString(result);
    });
  }
};
