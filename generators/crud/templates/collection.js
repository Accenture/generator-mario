'use strict';

define([
    'backbone',
    '<%= modelPath %>'
], function (Backbone, <%= modelName %>) {
    'use strict';

    return Backbone.Collection.extend({
        model: <%= modelName %>,

        //overridden to generate id offline during runtime
        add: function (model) {
          if(! Array.isArray(model) && ! model.id) {
            var id = (this.length > 0) ? this.last().get('id') : 0;
            model.set('id', id + 1);
          }

          Backbone.Collection.prototype.add.call(this, model);
        }
    });
});
