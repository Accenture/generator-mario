import Marionette from 'marionette';
import * as JST from 'templates';

export default Marionette.ItemView.extend({
  tagName: 'li',
  className: '',
  template: JST['app/scripts/apps/sidebar/sidebar-item-view-template.hbs'],
  events: {
    'click': 'clickHandler'
  },

  clickHandler() {
    this.trigger('sidebar-item:clicked', this.model);
  }
});
