import {LayoutView} from 'marionette';
import * as JST from 'templates';

export default LayoutView.extend({
  template: JST['app/scripts/apps/main/main<%= delimiter %>layout<%= delimiter %>view<%= delimiter %>template.hbs'],
  regions: {
      'contentRegion': '#content',
      'navigationRegion': '#navigation',
      'sidebarRegion': '#sidebar'
  },
  el: '#wrapper'
});
