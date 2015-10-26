import {CompositeView} from 'marionette';
import * as JST from 'templates';
import NavigationItemView from 'apps/navigation/navigation-item-view';

export default CompositeView.extend({
  tagName: 'div',
  template: JST['app/scripts/apps/navigation/navigation-composite-view-template.hbs'],
  childView: NavigationItemView,
  childViewContainer: '#lang'
});
