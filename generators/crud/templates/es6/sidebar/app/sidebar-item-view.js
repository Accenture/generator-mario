import Marionette from 'marionette';
import * as JST from 'templates';

export default Marionette.ItemView.extend({
  tagName: 'li',
  className: '',
  template: JST['app/scripts/apps/sidebar/sidebar<%= delimiter %>item<%= delimiter %>view<%= delimiter %>template.hbs'],
  events: {
    'click': 'clickHandler'
  },

  clickHandler() {
    this.trigger('sidebar-item:clicked', this.model);
  }
});
