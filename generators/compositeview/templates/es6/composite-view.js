import {CompositeView} from 'marionette';
import * as JST from 'templates';
import <%= childItemView %> from '<%= childPath %>';


export default CompositeView.extend({
  tagName: 'div',
  template: JST['<%= template %>'],
  childView: <%= childItemView %>,
  childViewContainer: '#itemView'
});
