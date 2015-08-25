'use strict';
var path = require('path');
var url = require('url');
var baseDir = 'app/scripts/apps/';
var appsDir = 'apps/';
var _ = require('lodash');

var hbsExt = '.hbs';
var testSuffix = 'test',
  templateSufix = 'template',
  _deliter = '-',
  _jsext = '.js';
var _fileNames = {
  model: 'model',
  collection: 'collection',
  itemview: 'item-view',
  collectionview: 'collection-view',
  compositeview: 'composite-view',
  layoutview: 'layout-view',
  controller: 'controller',
  router: 'router'
};

function Utils() {
  this.testBaseDir = 'app/scripts/apps';
  this.testNameWithPath = function (directory, name, type) {
    return path.join(this.testBaseDir, directory, testfileName(name, type) + _jsext);
  };
}

function fileName(name, type) {
  if (name.lastIndexOf(type) === -1) {
    return name + _deliter + type;
  }
  if (name.length < type.length) {
    return name + _deliter + type;
  }
  if (name.lastIndexOf(type) === (name.length - type.length)) {
    return name;
  }
  return name + _deliter + type;
}

function testName(name, type) {
  return fileName(name, type) + _deliter + testSuffix;
}

function testfileName(name, type) {
  return fileName(name, type) + _deliter + testSuffix;
}

function templatefileName(name, type) {
  if (name.lastIndexOf(templateSufix) !== -1 && (name.lastIndexOf(templateSufix) === (name.length - templateSufix.length))) {
    return name + hbsExt;
  }
  return fileName(name, type) + _deliter + templateSufix + hbsExt;
}

function getCollectionFileName(name) {
  return fileName(name, _fileNames.collection);
}

function fileNameWithPath(directory, name, type) {
  var pathObject = path.parse(name);

  if (pathObject.ext.length !== 0) {
    return path.join(baseDir, directory, fileName(name, type));
  }
  return path.join(baseDir, directory, fileName(name, type) + _jsext);
}

function testWithPath(directory, name, type) {
  return path.join(baseDir, directory, testfileName(name, type) + _jsext);
}

function templateNameWithPath(directory, name, type) {
  var pathObject = path.parse(name);
  if (pathObject.ext.length > 0) {
    return url.resolve(baseDir + directory + '/', pathObject.base);
  }
  return url.resolve(baseDir + directory + '/', templatefileName(name, type));
}

function truncateBasePath(filePath) {
  if(filePath.substring(0, 17) === baseDir) {
    filePath = filePath.slice(17);
  }

  return filePath;
}

/**
 * creates relative AMD path from name and type if custom dir is not provided
 * otherwise it will create a path relative to projects scripts forlder.
 * @param {String} name The name
 * @param {String} type The type saved in this.type
 */
function amd(name, type, customDir) {
  if(!customDir) {
    return './' + fileName(name, type);
  }

  return appsDir + customDir + '/' + fileName(name, type);
}

function className(name, type) {
  var pathObject = path.parse(name);
  if (pathObject.ext.length !== 0) {
    name = pathObject.name;
  }
  if (name.lastIndexOf(type) === (name.length - type.length)) {
    name = name.substring(0, name.length - 1 - type.length);
  }
  return _.capitalize(_.camelCase(name + _.capitalize(_.camelCase(type))));
}

function variableName(name){
  return name.substr(0,1).toLowerCase()+ name.substr(1);
}

module.exports = {
  fileName: fileName,
  testName: testName,
  templateName: templatefileName,
  getCollectionFileName: getCollectionFileName,
  fileNameWithPath: fileNameWithPath,
  testNameWithPath: testWithPath,
  templateNameWithPath: templateNameWithPath,
  amd: amd,
  className: className,
  varName: variableName,
  type: _fileNames,
  truncateBasePath: truncateBasePath,
  Utils: Utils
};
