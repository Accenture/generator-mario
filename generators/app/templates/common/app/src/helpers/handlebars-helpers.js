
import Handlebars from 'handlebars';

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
  }
}
