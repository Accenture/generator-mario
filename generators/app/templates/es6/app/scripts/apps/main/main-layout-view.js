import {LayoutView} from 'marionette';
import * as JST from 'templates';

export default LayoutView.extend({
  template: JST['app/scripts/apps/main/main-layout-view-template.hbs'],
  regions: {
      'contentRegion': '#content',
      'navigationRegion': '#navigation',
      'sidebarRegion': '#sidebar'
  },
  el: '#wrapper'
});
