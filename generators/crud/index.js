'use strict';

var esprima = require('esprima');
var escodegen = require('escodegen');
var DirBase = require('../dir-base');
var utils = require('../utils');
var lodash = require('lodash');
var fs = require('fs');

/*
	object for importing dependencies with className, path
	resulting expresion is in form: "import className from 'path'"
 */
function createEs6Import(className, path) {
	return {
		'type': 'ImportDeclaration',
		'specifiers': [
			{
				'type': 'ImportDefaultSpecifier',
				'local': {
					'type': 'Identifier',
					'name': className
				}
			}
		],
		'source': {
			'type': 'Literal',
			'value': path,
			'raw': '\'' + path + '\''
		}
	};
}

/*
	object for registering router into initializeUI function with className, region
	resulting expression in in form: "new className({ region: rootView.region })"
 */
function createInstance(className, region) {
	return {
		'type': 'ExpressionStatement',
		'expression': {
			'type': 'NewExpression',
			'callee': {
				'type': 'Identifier',
				'name': className
			},
			'arguments': [
				{
					'type': 'ObjectExpression',
					'properties': [
						{
							'type': 'Property',
							'key': {
								'type': 'Identifier',
								'name': 'region'
							},
							'computed': false,
							'value': {
								'type': 'MemberExpression',
								'computed': false,
								'object': {
									'type': 'Identifier',
									'name': 'rootView'
								},
								'property': {
								'type': 'Identifier',
								'name': region
								}
							},
							'kind': 'init',
							'method': false,
							'shorthand': false
						}
					]
				}
			]
		}
	};
}

function findMainContentIndex(tree) {
	return lodash.findIndex(tree.body, {
		'expression': {
			'callee': {
				'type': 'Identifier',
				'name': 'define'
			}
		}
	});
}

function findInitializeUiIndex(result) {
	return lodash.findIndex(result.body, {
		'type': 'VariableDeclaration',
		'declarations': [
			{
				'type': 'VariableDeclarator',
				'id': {
					'type': 'Identifier',
					'name': 'initializeUI'
				}
			}
		]
	});
}

function registerAMD(generator, tree, component) {
	//registering router path in AMD
	var componentNameWithPath = 'apps/' + component.dir + '/' + component.name + utils.delimiter + component.type;
  var contentIndex = findMainContentIndex(tree);
	var result = tree.body[contentIndex].expression;
	var existingImports = result.arguments[0].elements;
	var className = utils.className(component.name, component.type);
	var existingObjects = result.arguments[1].params;

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
	result.arguments[0].elements.push({
		'type': 'Literal',
		'value': '' + componentNameWithPath + '',
		'raw': '\'' + componentNameWithPath + '\''
	});

	//register router in function(X, Y, Z, SomeRouter)
  result.arguments[1].params.push({
    type: 'Identifier',
    name: className
  });

  return tree;
}

function registerImport(generator, component, tree) {
  var className = utils.className(component.name, component.type);
	var componentNameWithPath = 'apps/' + component.dir + '/' + component.name + utils.delimiter + component.type;

	//list of imports
	var filteredImports = tree.body.filter(function(value) {
		return value.type === 'ImportDeclaration';
	});

	//register import
	tree.body.splice(filteredImports.length, 0, createEs6Import(className, componentNameWithPath));

  return tree;
}

function registerInstanceEs6(tree, component) {
	var region = component.region || 'contentRegion';
	var className = utils.className(component.name, component.type);
	var initializeUiIndex = findInitializeUiIndex(tree);

	//register instance
	tree.body[initializeUiIndex].declarations[0].init.body.body.push(createInstance(className, region));

  return tree;
}

function registerInstanceEs5(tree, component) {
  var region = component.region || 'contentRegion';
  var className = utils.className(component.name, component.type);
	var contentIndex = findMainContentIndex(tree);
	var result = tree.body[contentIndex].expression.arguments[1].body;
	var initializeUiIndex = findInitializeUiIndex(result);

	//register instance
  result.body[initializeUiIndex].declarations[0].init.body.body.push(createInstance(className, region));

  return tree;
}

function registerES5Component(generator, fileContents, component) {
	var tree = esprima.parse(fileContents);

	tree = registerAMD(generator, tree, component);
  tree = registerInstanceEs5(tree, component);

	return escodegen.generate(tree);
}

function registerES6Component(generator, fileContents, component) {
	var tree = esprima.parse(fileContents, {sourceType: 'module'});

	tree = registerImport(generator, component, tree);
  tree = registerInstanceEs6(tree, component);

  return escodegen.generate(tree);
}

module.exports = DirBase.extend({
  constructor: function() {
    DirBase.apply(this, arguments);
    this.option('directory', {alias: 'd', desc: 'create crud within specified directory'});
    this.sourceDir = (this.options.ecma === 6) ? 'es6/' : 'es5/';
  },
  initializing: function() {
		// load config
    DirBase.prototype.initializing.call(this);

    // generate model
    this.composeWith('mario:model', {
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
          detailViewPath: utils.amd(this.name + utils.delimiter + 'detail', utils.type.itemview),
          createViewPath: utils.amd(this.name + utils.delimiter + 'create', utils.type.itemview),
          compositeViewPath: utils.amd(this.name, utils.type.compositeview),

          modelName: utils.className(this.name, utils.type.model),
          collectionName: utils.className(this.name, utils.type.collection),
          collectionViewName: utils.className(this.name, utils.type.collectionview),
          detailViewName: utils.className(this.name + utils.delimiter + 'detail', utils.type.itemview),
          createViewName: utils.className(this.name + utils.delimiter + 'create', utils.type.itemview),
          compositeViewName: utils.className(this.name, utils.type.compositeview)
        }
      );

      this.fs.copyTpl(
        this.templatePath(this.sourceDir + '_controller-test.js'),
        this.destinationPath(utils.testNameWithPath(this.options.directory, this.name, utils.type.controller, this.testBaseDir)),
        {
          controllerPath: utils.amd(this.name, utils.type.controller, this.options.directory),
          controllerName: utils.className(this.name, utils.type.controller),
          delimiter: utils.delimiter
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
          featureName: this.name,
          delimiter: utils.delimiter
        }
      );
    },

    detail: function() {
      this.fs.copy(
        this.templatePath('common/detail-template.hbs'),
        this.destinationPath(utils.templateNameWithPath(this.options.directory, this.name + utils.delimiter + 'detail', utils.type.itemview))
      );

      this.fs.copyTpl(
        this.templatePath(this.sourceDir + '_detail-view.js'),
        this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name + utils.delimiter + 'detail', utils.type.itemview)),
        {
          featureName: this.name,
          templatePath: utils.templateNameWithPath(this.options.directory, this.name + utils.delimiter + 'detail', utils.type.itemview)
        }
      );

      this.fs.copyTpl(
        this.templatePath(this.sourceDir + '_detail-view-test.js'),
        this.destinationPath(utils.testNameWithPath(this.options.directory, this.name + utils.delimiter + 'detail', utils.type.itemview, this.testBaseDir)),
        {
          detailItemViewPath: utils.amd(this.name + utils.delimiter + 'detail', utils.type.itemview, this.options.directory),
          detailItemViewName: utils.className(this.name + utils.delimiter + 'detail', utils.type.itemview),
          featureName: this.name,
          delimiter: utils.delimiter
        }
      );
    },

    create: function() {
      this.fs.copy(
        this.templatePath('common/create-template.hbs'),
        this.destinationPath(
          utils.templateNameWithPath(this.options.directory, this.name + utils.delimiter + 'create', utils.type.itemview)
        )
      );

      this.fs.copyTpl(
        this.templatePath(this.sourceDir + '_create-view.js'),
        this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name + utils.delimiter + 'create', utils.type.itemview)),
        {
          featureName: this.name,
          templatePath: utils.templateNameWithPath(this.options.directory, this.name + utils.delimiter + 'create', utils.type.itemview)
        }
      );

      this.fs.copyTpl(
        this.templatePath(this.sourceDir + '_create-view-test.js'),
        this.destinationPath(utils.testNameWithPath(this.options.directory, this.name + utils.delimiter + 'create', utils.type.itemview, this.testBaseDir)),
        {
          createItemViewPath: utils.amd(this.name + utils.delimiter + 'create', utils.type.itemview, this.options.directory),
          createItemViewName: utils.className(this.name + utils.delimiter + 'create', utils.type.itemview),
          featureName: this.name,
          delimiter: utils.delimiter
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
          featureName: this.name,
          delimiter: utils.delimiter
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
        this.log('Copying sidebar files ...');
        var sourceDir = this.templatePath(this.sourceDir + 'sidebar/app');
        var testDir = this.templatePath(this.sourceDir + 'sidebar/tests');

        var appFiles = fs.readdirSync(sourceDir);
        var testFiles = fs.readdirSync(testDir);

        appFiles.forEach(function(file) {
          var underScoredFile = file.replace(/-/g, utils.delimiter);

          this.fs.copyTpl(
            sourceDir + '/' + file,
            this.destinationPath('app/scripts/apps/sidebar/' + underScoredFile),
            { delimiter: utils.delimiter }
          );
        }, this);

        testFiles.forEach(function(file) {
          var underScoredFile = file.replace(/-/g, utils.delimiter);

          this.fs.copyTpl(
            testDir + '/' + file,
            this.destinationPath(this.testBaseDir + '/sidebar/' + underScoredFile),
            { delimiter: utils.delimiter }
          );
        }, this);
      } else {
        this.log('Skipping sidebar files ...');
      }
    }
  }
});
