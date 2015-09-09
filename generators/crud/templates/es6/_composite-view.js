'use strict';

import Marionette from 'marionette';
import * as JST from 'templates';
import <%= itemViewName %> from '<%= itemViewPath %>';

export default Marionette.CompositeView.extend({
    template: JST['<%= templatePath %>'],
    childView: <%= itemViewName %>,
    childViewContainer: '#item-view-container',
    className: '',
    ui: {
      create: 'button.create'
    },
    triggers: {
      'click @ui.create': '<%= featureName %>:navigateNew'
    },
    collectionEvents: {
      'update': 'render'
    }
});
