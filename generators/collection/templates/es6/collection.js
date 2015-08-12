import {Collection} from 'backbone';
import <%= modelNameCamelCase %> from '<%= modelPath %>';

export default Collection.extend({
  model: <%= modelNameCamelCase %>,
  defaults: {
  }
});
