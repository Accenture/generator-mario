'use strict';

var generators = require('yeoman-generator');
var ast = require('ast-query');
var utils = require('../utils');

function formatName(postfix, generator) {
  return generator._.capitalize(generator._.camelize(generator.name + postfix));
}

module.exports = generators.NamedBase.extend({
  constructor: function () {
    generators.generators.NamedBase.apply(this, arguments);
    this.option('directory', {alias:'d', desc: 'create crud within specified directory'});
  },
  initializing: function () {
    this.options.directory = this.options.directory || this.options.d;

    if(!this.options.directory) {
      this.log.error('--directory option is required!');
      process.exit(1);
    }

    // generate model
    this.composeWith('aowp-marionette:model', {
      options: {directory: this.options.directory},
      args: [this.name]
    });
  },
  writing: {
    router: function() {
      this.fs.copyTpl(
        this.templatePath('router.js'),
        this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.router)),
        {
          name: this.name,
          controllerPath: utils.amd(this.name, utils.type.controller),
          controllerName: utils.className(this.name, utils.type.controller)
        }
      );
    },

    controller: function () {
      this.fs.copyTpl(
        this.templatePath('controller.js'),
        this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.controller)),
        {
          featureName: this.name,
          featureNameUpper: formatName('', this),
          modelPath: utils.amd(this.name, utils.type.model),
          collectionPath: utils.amd(this.name, utils.type.collection),
          collectionViewPath: utils.amd(this.name, utils.type.collectionview),
          detailViewPath: utils.amd(this.name + '-detail', utils.type.itemview),
          createViewPath: utils.amd(this.name + '-create', utils.type.itemview),
          compositeViewPath: utils.amd(this.name, utils.type.compositeview),

          modelName: utils.className(this.name, utils.type.model),
          collectionName: utils.className(this.name, utils.type.collection),
          collectionViewName: utils.className(this.name, utils.type.collectionview),
          detailViewName: utils.className(this.name + '-detail', utils.type.itemview),
          createViewName: utils.className(this.name + '-create', utils.type.itemview),
          compositeViewName: utils.className(this.name, utils.type.compositeview)
        }
      );
    },

    collection: function () {
      this.fs.copyTpl(
        this.templatePath('collection.js'),
        this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.collection)),
        {
          modelName: utils.className(this.name, utils.type.model),
          modelPath: utils.amd(this.name, utils.type.model)
        }
      );
    },

    item: function() {
      this.fs.copyTpl(
        this.templatePath('item-template.hbs'),
        this.destinationPath(utils.templateNameWithPath(this.options.directory, this.name, utils.type.itemview)),
        {featureBaseRoute: this.name}
      );

      this.fs.copyTpl(
        this.templatePath('item-view.js'),
        this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.itemview)),
        {
          featureName: this.name,
          templatePath: utils.templateNameWithPath(this.options.directory, this.name, utils.type.itemview),
          featureNameUpper: formatName('', this)
        }
      );
    },

    detail: function () {
      this.fs.copy(
        this.templatePath('detail-template.hbs'),
        this.destinationPath(utils.templateNameWithPath(this.options.directory, this.name + '-detail', utils.type.itemview))
      );

      this.fs.copyTpl(
        this.templatePath('detail-view.js'),
        this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name + '-detail', utils.type.itemview)),
        {
          featureName: this.name,
          featureNameUpper: formatName('', this),
          templatePath: utils.templateNameWithPath(this.options.directory, this.name + '-detail', utils.type.itemview)
        }
      );
    },

    create: function() {
      this.fs.copy(
        this.templatePath('create-template.hbs'),
        this.destinationPath(
          utils.templateNameWithPath(this.options.directory, this.name + '-create', utils.type.itemview)
        )
      );

      this.fs.copyTpl(
        this.templatePath('create-view.js'),
        this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name + '-create', utils.type.itemview)),
        {
          featureName: this.name,
          featureNameUpper: formatName('', this),
          templatePath: utils.templateNameWithPath(this.options.directory, this.name + '-create', utils.type.itemview)
        }
      );
    },

    composite: function() {
      this.fs.copyTpl(
        this.templatePath('composite-template.hbs'),
        this.destinationPath(utils.templateNameWithPath(this.options.directory, this.name, utils.type.compositeview)),
        {name: this.name}
      );

      this.fs.copyTpl(
        this.templatePath('composite-view.js'),
        this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.compositeview)),
        {
          featureName: this.name,
          featureNameUpper: formatName('', this),
          templatePath: utils.templateNameWithPath(this.options.directory, this.name, utils.type.compositeview),
          itemViewPath: utils.amd(this.name, utils.type.itemview),
          itemViewName: utils.className(this.name, utils.type.itemview)
        }
      );
    },

    registerRouter: function () {
      var filePath = this.destinationPath('app/scripts/app.js');
      var tree = ast(this.fs.read(filePath));

      // registering path to router in AMD
      var result = tree.callExpression('define');
      var routerNameWithPath = 'apps/' + this.options.directory + '/' + this.name + '-' + utils.type.router;

      var existingImports = result.arguments.at(0).nodes[0].elements;
      var className = utils.className(this.name, utils.type.router);
      var existingObjects = result.arguments.at(1).node.params;

      //check import path exists
      if (this._.some(existingImports, function(elem) { return elem.value === routerNameWithPath; }, this)) {
        this.log.error('Router path conflict while updating app.js, aborting file update!');
        return;
      }

      //check import object exists
      if (this._.some(existingObjects, function(elem) { return elem.name === className; }, this)) {
        this.log.error('Router Object name conflict while updating app.js, aborting file update!');
        return;
      }

      //register import (filepath)
      result.arguments.at(0).push('\'' + routerNameWithPath + '\'');

      // register router in function(X, Y, Z, OurRouter)
      result.arguments.at(1).node.params.push({
        type: 'Identifier',
        name: className
      });

      var onResult = tree.var('initializeUI');
      // call new OurRouter();
      onResult.value().body.append('new ' + formatName('-router', this) + '({region: rootView.contentRegion});');

      this.fs.write(filePath, tree.toString());
    }
  }
});
