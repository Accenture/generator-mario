import {Collection} from 'backbone';
import <%= modelName %> from '<%= modelPath %>';

export default Collection.extend({
    model: <%= modelName %>,
    url: '<%= jsonUrl %>'
});
