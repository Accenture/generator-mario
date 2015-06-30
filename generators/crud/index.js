'use strict';

var generators = require('yeoman-generator');
var path = require('path');
var baseDir = 'app/scripts/apps';
var ast = require('ast-query');

function formatPath(postfix, generator) {
  return './' + generator.name + postfix;
}

function formatName(postfix, generator) {
  return generator._.capitalize(generator._.camelize(generator.name + postfix));
}

module.exports = generators.NamedBase.extend({
  constructor: function () {
    generators.generators.NamedBase.apply(this, arguments);
    this.option('directory', {desc: 'create model within specified directory'});
  },
  initializing: function () {
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
        this.destinationPath(
          path.join(baseDir, this.options.directory, this.name + '-router.js')
        ),
        {
          name: this.name,
          controllerPath: './' + this.name + '-controller',

          //controller is not a contructor need to be lowercase first letter
          controllerName: this._.camelize(this.name + 'Controller')
        }
      );
    },

    controller: function () {
      this.fs.copyTpl(
        this.templatePath('controller.js'),
        this.destinationPath(
          path.join(baseDir, this.options.directory, this.name + '-controller.js')
        ),
        {
          featureName: this.name,
          featureNameUpper: formatName('', this),
          modelPath: formatPath('-model', this),
          collectionPath: formatPath('-collection', this),
          collectionViewPath: formatPath('-collection-view', this),
          detailViewPath: formatPath('-detail-item-view', this),
          createViewPath: formatPath('-create-item-view', this),
          compositeViewPath: formatPath('-composite-view', this),

          modelName: formatName('Model', this),
          collectionName: formatName('Collection', this),
          collectionViewName: formatName('CollectionView', this),
          detailViewName: formatName('DetailItemView', this),
          createViewName: formatName('CreateItemView', this),
          compositeViewName: formatName('CompositeView', this)
        }
      );
    },

    collection: function () {
      this.fs.copyTpl(
        this.templatePath('collection.js'),
        this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-collection.js')),
        {
          modelName: formatName('Model', this),
          modelPath: formatPath('-model', this)
        }
      );
    },

    item: function() {
      this.fs.copyTpl(
        this.templatePath('item-template.hbs'),
        this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-item-template.hbs')),
        {featureBaseRoute: this.name}
      );

      this.fs.copyTpl(
        this.templatePath('item-view.js'),
        this.destinationPath(
          path.join(baseDir, this.options.directory, this.name + '-item-view.js')
        ),
        {
          featureName: this.name,
          templatePath: baseDir + '/' + this.options.directory + '/' + this.name + '-item-template.hbs',
          featureNameUpper: formatName('', this)
        }
      );
    },

    detail: function () {
      this.fs.copy(
        this.templatePath('detail-template.hbs'),
        this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-detail-item-template.hbs'))
      );

      this.fs.copyTpl(
        this.templatePath('detail-view.js'),
        this.destinationPath(
          path.join(baseDir, this.options.directory, this.name + '-detail-item-view.js')
        ),
        {
          featureName: this.name,
          featureNameUpper: formatName('', this),
          templatePath: baseDir + '/' + this.options.directory + '/' + this.name + '-detail-item-template.hbs'
        }
      );
    },

    create: function() {
      this.fs.copy(
        this.templatePath('create-template.hbs'),
        this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-create-item-template.hbs'))
      );

      this.fs.copyTpl(
        this.templatePath('create-view.js'),
        this.destinationPath(
          path.join(baseDir, this.options.directory, this.name + '-create-item-view.js')
        ),
        {
          featureName: this.name,
          featureNameUpper: formatName('', this),
          templatePath: baseDir + '/' + this.options.directory + '/' + this.name + '-create-item-template.hbs'
        }
      );
    },

    composite: function() {
      this.fs.copyTpl(
        this.templatePath('composite-template.hbs'),
        this.destinationPath(path.join(baseDir, this.options.directory, this.name + '-composite-template.hbs')),
        {name: this.name}
      );

      this.fs.copyTpl(
        this.templatePath('composite-view.js'),
        this.destinationPath(
          path.join(baseDir, this.options.directory, this.name + '-composite-view.js')
        ),
        {
          featureName: this.name,
          featureNameUpper: formatName('', this),
          templatePath: baseDir + '/' + this.options.directory + '/' + this.name + '-composite-template.hbs',
          itemViewPath: formatPath('-item-view', this),
          itemViewName: formatName('ItemView', this)
        }
      );
    },

    registerRouter: function () {
      var filePath = this.destinationPath('app/scripts/app.js');
      var tree = ast(this.fs.read(filePath));

      // registering path to router in AMD
      var result = tree.callExpression('define');
      result.arguments.at(0).push('\'apps/' + this.options.directory + '/' + this.name + '-router' + '\'');

      // register router in function(X, Y, Z, OurRouter)
      result.arguments.at(1).node.params.push({
        type: 'Identifier',
        name: formatName('-router', this)
      });


      var onResult = tree.var('initializeUI');
      // call new OurRouter();
      onResult.value().body.append('new ' + formatName('-router', this) + '({region: rootView.contentRegion});');

      this.fs.write(filePath, tree.toString());
    }
  }
});
