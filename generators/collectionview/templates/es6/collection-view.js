import {CollectionView} from 'marionette';
import <%= childItemView %> from '<%= childPath %>';

export default CollectionView.extend({
  childView: <%= childItemView %>
});
