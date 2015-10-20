import {Collection} from 'backbone';
import <%= modelNameCamelCase %> from '<%= modelPath %>';

export default Collection.extend({
  model: <%= modelNameCamelCase %>,<% if(url) { %>
  url: '<%= url %>',<% } %>
  defaults: {
  }
});
