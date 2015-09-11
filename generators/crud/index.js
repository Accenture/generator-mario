'use strict';

var ast = require('ast-query');
var DirBase = require('../dir-base');
var utils = require('../utils');
var lodash = require('lodash');
var fs = require('fs');

function parseSourceContents(contents) {
  contents = contents.split(/\r\n|\r|\n/g);

  //get import lines
  var imports = contents.filter(function(line) {
    return line.lastIndexOf('import', 0) === 0;
  });

  //get export line
  var exportLine = contents.filter(function(line) {
    return line.lastIndexOf('export', 0) === 0;
  });

  //get code parsable via ast
  var code = contents.filter(function(line) {
    return line.lastIndexOf('import', 0) !== 0 && line.lastIndexOf('export', 0) !== 0;
  }).join('\n');

  return {
    code: code, imports: imports, export: exportLine
  };
}

function registerAMD(generator, tree, component) {
  // registering router path in AMD
  var result = tree.callExpression('define');
  var componentNameWithPath = 'apps/' + component.dir + '/' + component.name + '-' + component.type;

  var existingImports = result.arguments.at(0).nodes[0].elements;
  var className = utils.className(component.name, component.type);
  var existingObjects = result.arguments.at(1).node.params;

  //check import path exists
  if (lodash.some(existingImports, function(elem) { return elem.value === componentNameWithPath; }, generator)) {
    generator.log.error(component.name + component.type + ' path conflict while updating app.js, aborting file update!');
    return tree;
  }

  //check import object exists
  if (lodash.some(existingObjects, function(elem) { return elem.name === className; }, generator)) {
    generator.log.error(component.name + component.type + 'Router Object name conflict while updating app.js, aborting file update!');
    return tree;
  }

  //register import (filepath)
  result.arguments.at(0).push('\'' + componentNameWithPath + '\'');

  // register router in function(X, Y, Z, SomeRouter)
  result.arguments.at(1).node.params.push({
    type: 'Identifier',
    name: className
  });

  return tree;
}

function registerImport(generator, component, imports) {
  var className = utils.className(component.name, component.type);
  var componentNameWithPath = 'apps/' + component.dir + '/' + component.name + '-' + component.type;

  imports.push('import ' + className + ' from \'' + componentNameWithPath + '\';');

  return imports;
}

function registerInstance(tree, component) {
  var region = component.region || 'contentRegion';

  var className = utils.className(component.name, component.type);
  var result = tree.var('initializeUI');

  // new SomeRouter({region: someRegionVariable});
  var code = 'new ' + className + '({region: rootView.' + region + '})';
  result.value().body.append(code);

  return tree;
}

function registerES5Component(generator, fileContents, component) {
  var tree = ast(fileContents);

  //register stuff
  tree = registerAMD(generator, tree, component);
  tree = registerInstance(tree, component);

  return tree.toString();
}

function registerES6Component(generator, fileContents, component) {
  //get import, code, export separately
  var parsedSource = parseSourceContents(fileContents);
  var tree = ast(parsedSource.code);

  //register stuff
  var imports = registerImport(generator, component, parsedSource.imports);
  tree = registerInstance(tree, component);

  //concatenate parts back together
  var updatedFile = imports.join('\n') + '\n\n' +
    tree.toString() + '\n\n' + parsedSource.export;

  return updatedFile;
}

module.exports = DirBase.extend({
  constructor: function() {
    DirBase.apply(this, arguments);
    this.option('directory', {alias: 'd', desc: 'create crud within specified directory'});
    this.sourceDir = (this.options.ecma === 6) ? 'es6/' : 'es5/';
  },
  initializing: function() {
    // generate model
    this.composeWith('aowp-marionette:model', {
      options: {directory: this.options.directory},
      args: [this.name]
    });
  },
  writing: {
    router: function() {
      this.fs.copyTpl(
        this.templatePath(this.sourceDir + '_router.js'),
        this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.router)),
        {
          name: this.name,
          controllerPath: utils.amd(this.name, utils.type.controller),
          controllerName: utils.className(this.name, utils.type.controller)
        }
      );
    },

    controller: function() {
      this.fs.copyTpl(
        this.templatePath(this.sourceDir + '_controller.js'),
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

      this.fs.copyTpl(
        this.templatePath(this.sourceDir + '_controller-test.js'),
        this.destinationPath(utils.testNameWithPath(this.options.directory, this.name, utils.type.controller, this.testBaseDir)),
        {
          controllerPath: utils.amd(this.name, utils.type.controller, this.options.directory),
          controllerName: utils.className(this.name, utils.type.controller)
        }
      );
    },

    collection: function() {
      this.fs.copyTpl(
        this.templatePath(this.sourceDir + '_collection.js'),
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
        this.templatePath('common/item-template.hbs'),
        this.destinationPath(utils.templateNameWithPath(this.options.directory, this.name, utils.type.itemview)),
        {featureBaseRoute: this.name}
      );

      this.fs.copyTpl(
        this.templatePath(this.sourceDir + '_item-view.js'),
        this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.itemview)),
        {
          featureName: this.name,
          templatePath: utils.templateNameWithPath(this.options.directory, this.name, utils.type.itemview),
        }
      );

      this.fs.copyTpl(
        this.templatePath(this.sourceDir + '_item-view-test.js'),
        this.destinationPath(utils.testNameWithPath(this.options.directory, this.name, utils.type.itemview, this.testBaseDir)),
        {
          itemViewPath: utils.amd(this.name, utils.type.itemview, this.options.directory),
          itemViewName: utils.className(this.name, utils.type.itemview),
          featureName: this.name
        }
      );
    },

    detail: function() {
      this.fs.copy(
        this.templatePath('common/detail-template.hbs'),
        this.destinationPath(utils.templateNameWithPath(this.options.directory, this.name + '-detail', utils.type.itemview))
      );

      this.fs.copyTpl(
        this.templatePath(this.sourceDir + '_detail-view.js'),
        this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name + '-detail', utils.type.itemview)),
        {
          featureName: this.name,
          templatePath: utils.templateNameWithPath(this.options.directory, this.name + '-detail', utils.type.itemview)
        }
      );

      this.fs.copyTpl(
        this.templatePath(this.sourceDir + '_detail-view-test.js'),
        this.destinationPath(utils.testNameWithPath(this.options.directory, this.name + '-detail', utils.type.itemview, this.testBaseDir)),
        {
          detailItemViewPath: utils.amd(this.name + '-detail', utils.type.itemview, this.options.directory),
          detailItemViewName: utils.className(this.name + '-detail', utils.type.itemview),
          featureName: this.name
        }
      );
    },

    create: function() {
      this.fs.copy(
        this.templatePath('common/create-template.hbs'),
        this.destinationPath(
          utils.templateNameWithPath(this.options.directory, this.name + '-create', utils.type.itemview)
        )
      );

      this.fs.copyTpl(
        this.templatePath(this.sourceDir + '_create-view.js'),
        this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name + '-create', utils.type.itemview)),
        {
          featureName: this.name,
          templatePath: utils.templateNameWithPath(this.options.directory, this.name + '-create', utils.type.itemview)
        }
      );

      this.fs.copyTpl(
        this.templatePath(this.sourceDir + '_create-view-test.js'),
        this.destinationPath(utils.testNameWithPath(this.options.directory, this.name + '-create', utils.type.itemview, this.testBaseDir)),
        {
          createItemViewPath: utils.amd(this.name + '-create', utils.type.itemview, this.options.directory),
          createItemViewName: utils.className(this.name + '-create', utils.type.itemview),
          featureName: this.name
        }
      );
    },

    composite: function() {
      this.fs.copyTpl(
        this.templatePath('common/_composite-template.hbs'),
        this.destinationPath(utils.templateNameWithPath(this.options.directory, this.name, utils.type.compositeview)),
        {name: this.name}
      );

      this.fs.copyTpl(
        this.templatePath(this.sourceDir + '_composite-view.js'),
        this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.compositeview)),
        {
          featureName: this.name,
          templatePath: utils.templateNameWithPath(this.options.directory, this.name, utils.type.compositeview),
          itemViewPath: utils.amd(this.name, utils.type.itemview),
          itemViewName: utils.className(this.name, utils.type.itemview)
        }
      );

      this.fs.copyTpl(
        this.templatePath(this.sourceDir + '_composite-view-test.js'),
        this.destinationPath(utils.testNameWithPath(this.options.directory, this.name, utils.type.compositeview, this.testBaseDir)),
        {
          compositeViewPath: utils.amd(this.name, utils.type.compositeview, this.options.directory),
          compositeViewName: utils.className(this.name, utils.type.compositeview),
          featureName: this.name
        }
      );
    },

    dataJSON: function() {
      this.fs.copy(
        this.templatePath('common/crud-data.json'),
        this.destinationPath('app/jsondata/' + this.name + '-crud-data.json')
      );
    },

    registerFeatures: function() {
      //read file content
      var filePath = this.destinationPath('app/scripts/app.js');
      var fileContents = this.fs.read(filePath);

      var component = {
        name: this.name, dir: this.options.directory, type: utils.type.router
      };
      var sidebar = {
        dir: 'sidebar', name: 'sidebar', type: utils.type.controller,
        region: 'sidebarRegion'
      };

      var isSidebar = fs.existsSync(this.destinationPath('app/scripts/apps/sidebar'));

      if (this.options.ecma === 6) {
        if (!isSidebar) {
          fileContents = registerES6Component(this, fileContents, sidebar);
        }
        fileContents = registerES6Component(this, fileContents, component);
      } else {
        if (!isSidebar) {
          fileContents = registerES5Component(this, fileContents, sidebar);
        }
        fileContents = registerES5Component(this, fileContents, component);
      }

      this.fs.write(filePath, fileContents + '\n'); // add new line to comply with jscs
    },

    sidebarFeature: function() {
      if (!fs.existsSync(this.destinationPath('app/scripts/apps/sidebar'))) {
        console.log('Copying sidebar files ...');
        this.fs.copy(
          this.templatePath(this.sourceDir + 'sidebar/app'),
          this.destinationPath('app/scripts/apps/sidebar')
        );

        this.fs.copy(
          this.templatePath(this.sourceDir + 'sidebar/tests'),
          this.destinationPath(this.testBaseDir + '/sidebar')
        );
      } else {
        console.log('Skipping sidebar files ...');
      }
    }
  }
});
