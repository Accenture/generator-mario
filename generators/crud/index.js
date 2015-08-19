'use strict';

var ast = require('ast-query');
var DirBase = require('../dir-base');
var utils = require('../utils');
var _ = require('lodash');
var fs = require('fs');

function registerComponent(tree, dir, name, type, generator, region) {
  region = region || 'contentRegion';

  // registering path to router in AMD
  var result = tree.callExpression('define');
  var componentNameWithPath = 'apps/' + dir + '/' + name + '-' + type;

  var existingImports = result.arguments.at(0).nodes[0].elements;
  var className = utils.className(name, type);
  var existingObjects = result.arguments.at(1).node.params;

  //check import path exists
  if (_.some(existingImports, function(elem) { return elem.value === componentNameWithPath; }, generator)) {
    generator.log.error(name + type + ' path conflict while updating app.js, aborting file update!');
    return tree;
  }

  //check import object exists
  if (_.some(existingObjects, function(elem) { return elem.name === className; }, generator)) {
    generator.log.error(name + type + 'Router Object name conflict while updating app.js, aborting file update!');
    return tree;
  }

  //register import (filepath)
  result.arguments.at(0).push('\'' + componentNameWithPath + '\'');

  // register router in function(X, Y, Z, OurRouter)
  result.arguments.at(1).node.params.push({
    type: 'Identifier',
    name: className
  });

  var onResult = tree.var('initializeUI');
  // call new OurRouter();
  onResult.value().body.append('new ' + className + '({region: rootView.' + region + '});');

  return tree;
}

module.exports = DirBase.extend({
  constructor: function () {
    DirBase.apply(this, arguments);
    this.option('directory', {alias:'d', desc: 'create crud within specified directory'});
  },
  initializing: function () {
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
          modelPath: utils.amd(this.name, utils.type.model),
          jsonUrl: '/jsondata/' + this.name + '-crud-data.json'
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
        }
      );

      this.fs.copyTpl(
        this.templatePath('item-view-test.js'),
        this.destinationPath(utils.testNameWithPath(this.options.directory, this.name, utils.type.itemview)),
        {
          itemViewPath: utils.amd(this.name, utils.type.itemview),
          itemViewName: utils.className(this.name, utils.type.itemview),
          featureName: this.name
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
          templatePath: utils.templateNameWithPath(this.options.directory, this.name + '-detail', utils.type.itemview)
        }
      );

      this.fs.copyTpl(
        this.templatePath('detail-view-test.js'),
        this.destinationPath(utils.testNameWithPath(this.options.directory, this.name + '-detail', utils.type.itemview)),
        {
          detailItemViewPath: utils.amd(this.name + '-detail', utils.type.itemview),
          detailItemViewName: utils.className(this.name + '-detail', utils.type.itemview),
          featureName: this.name
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
          templatePath: utils.templateNameWithPath(this.options.directory, this.name + '-create', utils.type.itemview)
        }
      );

      this.fs.copyTpl(
        this.templatePath('create-view-test.js'),
        this.destinationPath(utils.testNameWithPath(this.options.directory, this.name + '-create', utils.type.itemview)),
        {
          createItemViewPath: utils.amd(this.name + '-create', utils.type.itemview),
          createItemViewName: utils.className(this.name + '-create', utils.type.itemview),
          featureName: this.name
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
          templatePath: utils.templateNameWithPath(this.options.directory, this.name, utils.type.compositeview),
          itemViewPath: utils.amd(this.name, utils.type.itemview),
          itemViewName: utils.className(this.name, utils.type.itemview)
        }
      );

      this.fs.copyTpl(
        this.templatePath('composite-view-test.js'),
        this.destinationPath(utils.testNameWithPath(this.options.directory, this.name, utils.type.compositeview)),
        {
          compositeViewPath: utils.amd(this.name, utils.type.compositeview),
          compositeViewName: utils.className(this.name, utils.type.compositeview),
          featureName: this.name
        }
      );
    },

    dataJSON: function() {
      this.fs.copy(
        this.templatePath('crud-data.json'),
        this.destinationPath('app/jsondata/' + this.name + '-crud-data.json')
      );
    },

    registerFeatures: function () {
      var filePath = this.destinationPath('app/scripts/app.js');
      var tree = ast(this.fs.read(filePath));

      if(!fs.existsSync(this.destinationPath('app/scripts/apps/sidebar'))) {
        tree = registerComponent(tree, 'sidebar', 'sidebar', utils.type.controller, this, 'sidebarRegion');
      }
      tree = registerComponent(tree, this.options.directory, this.name, utils.type.router, this);

      this.fs.write(filePath, tree.toString());
    },

    sidebarFeature: function () {
      if(!fs.existsSync(this.destinationPath('app/scripts/apps/sidebar'))) {
        console.log('Copying sidebar files ...');
        this.fs.copy(
          this.templatePath('sidebar'),
          this.destinationPath('app/scripts/apps/sidebar')
        );
      } else {
        console.log('Skipping sidebar files ...');
      }
    }

  }
});
