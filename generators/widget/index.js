'use strict';

var utils = require('../utils');
var DirBase = require('../dir-base');

module.exports = DirBase.extend({
  writing:  {
    template: function() {
      this.fs.copyTpl(
        this.templatePath('_template.hbs'),
        this.destinationPath(utils.templateNameWithPath(this.options.directory, this.name, utils.type.itemview))
      );
    },
    other: function() {
      this.composeWith('mario:model', {options: {directory: this.options.directory}, args: [this.name]});
      this.composeWith('mario:collection', {
        options: {
          directory: this.options.directory,
          url: 'jsondata/items-collection.json'
        },
        args: [this.name]
      });
      this.composeWith('mario:itemview', {
        options: {
          directory: this.options.directory,
          template: utils.templateNameWithPath(this.options.directory, this.name, utils.type.itemview),
          skipcheck: {}
        },
        args: [this.name]
      });
      this.composeWith('mario:compositeview', {
        options: {
          directory: this.options.directory,
          itemview: utils.fileNameWithPath(this.options.directory, this.name, utils.type.itemview),
          skipcheck: {}
        },
        args: [this.name]
      });

      this.composeWith('mario:controller', {
        options: {
          directory: this.options.directory,
          // app
          compositeview: utils.fileNameWithPath(this.options.directory, this.name, utils.type.compositeview),
          model: utils.fileNameWithPath(this.options.directory, this.name, utils.type.model),
          collection: utils.fileNameWithPath(this.options.directory, this.name, utils.type.collection),
          skipcheck: {}
        },
        args: [this.name]
      });
      this.composeWith('mario:router', {options: {directory: this.options.directory}, args: [this.name]});
    }
  }
});
