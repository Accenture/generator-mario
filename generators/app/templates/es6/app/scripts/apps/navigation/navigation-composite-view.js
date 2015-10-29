import {CompositeView} from 'marionette';
import * as JST from 'templates';
import NavigationItemView from 'apps/navigation/navigation<%= delimiter %>item<%= delimiter %>view';

export default CompositeView.extend({
  tagName: 'div',
  template: JST['app/scripts/apps/navigation/navigation<%= delimiter %>composite<%= delimiter %>view<%= delimiter %>template.hbs'],
  childView: NavigationItemView,
  childViewContainer: '#lang'
});
