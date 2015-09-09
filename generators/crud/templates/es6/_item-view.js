import Marionette from 'marionette';
import * as JST from 'templates';

export default Marionette.ItemView.extend({
  template: JST['<%= templatePath %>'],
  tagName: 'li',
  className: 'list-group-item clearfix',
  ui: {
    button: 'button.edit'
  },
  triggers: {
    'click @ui.button': '<%= featureName %>:showDetail'
  }
});
