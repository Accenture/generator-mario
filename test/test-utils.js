'use strict';

var utils = require('../generators/utils');
var chai = require('chai');
var assert = chai.assert;
var path = require('path');

describe('utils', function() {
  it('model file name', function() {
    assert.equal(utils.fileName('people', utils.type.model), 'people-model', 'Model file name are equal');
  });
  it('model file name with type in name', function() {
    assert.equal(utils.fileName('people-model', utils.type.model), 'people-model', 'Model file name are equal');
  });
  it('model test file name', function() {
    assert.equal(utils.testName('people', utils.type.model), 'people-model-test', 'Model test file name are equal');
  });
  it('model with path', function() {
    assert.equal(utils.fileNameWithPath('people', 'people', utils.type.model), path.join('app', 'scripts', 'apps', 'people', 'people-model.js'), 'Model test file name are equal');
  });
  it('layoutview with path', function() {
    assert.equal(utils.fileNameWithPath('my-example', 'my-example', utils.type.layoutview), path.join('app', 'scripts', 'apps', 'my-example', 'my-example-layout-view.js'), 'Layout view file name are equal');
  });
  it('layoutview with type in name', function() {
    assert.equal(utils.fileNameWithPath('my-example', 'my-example-layout-view', utils.type.layoutview), path.join('app', 'scripts', 'apps', 'my-example', 'my-example-layout-view.js'), 'Layout view file name are equal');
  });
  it('model AMD', function() {
    assert.equal(utils.amd('people', utils.type.model), './people-model', 'Model AMD paths are equal');
  });
  it('model AMD with file name', function() {
    assert.equal(utils.amd('people-model', utils.type.model), './people-model', 'Model AMD paths are equal');
  });
  it('amd handles custom direcotry', function() {
    assert.equal(utils.amd('people-model', utils.type.model, 'customDirecotry'), 'apps/customDirecotry/people-model', 'Model AMD paths are equal');
  });
  it('model ClassName', function() {
    assert.equal(utils.className('people', utils.type.model), 'PeopleModel', 'Model ClassName are equal');
  });
  it('compositeview ClassName', function() {
    assert.equal(utils.className('people', utils.type.compositeview), 'PeopleCompositeView', 'CompositeView ClassName are equal');
  });
  it('collection file name', function() {
    assert.equal(utils.getCollectionFileName('people'), 'people-collection', 'Model file name are equal');
  });
  it('test name', function() {
    assert.equal(utils.testName('people', utils.type.collection), 'people-collection-test', 'Test name');
  });
  it('test name with type', function() {
    assert.equal(utils.testName('people-collection', utils.type.collection), 'people-collection-test', 'Test name');
  });
  it('test name with path', function() {
    var myUtils = new utils.Utils();
    assert.equal(myUtils.testNameWithPath('people', 'people', utils.type.collection), path.join('app', 'scripts', 'apps', 'people', 'people-collection-test.js'), 'Test name');
  });
  it('template path', function() {
    assert.equal(utils.templateNameWithPath('address', 'address', utils.type.itemview), 'app/scripts/apps/address/address-item-view-template.hbs', 'Template paths are equal');
  });
  it('template path with type in name', function() {
    assert.equal(utils.templateNameWithPath('my-example', 'my-example-layout-view', utils.type.layoutview), 'app/scripts/apps/my-example/my-example-layout-view-template.hbs', 'Template paths are equal');
  });
  it('template file name', function() {
    assert.equal(utils.templateName('my-example', utils.type.layoutview), 'my-example-layout-view-template.hbs');
  });
  it('template file name with suffix', function() {
    assert.equal(utils.templateName('my-example-composite-view-template', utils.type.compositeview), 'my-example-composite-view-template.hbs');
  });
  it('template file name with template in name', function() {
    assert.equal(utils.templateName('my-template-test', utils.type.compositeview), 'my-template-test-composite-view-template.hbs');
  });
  it('expanded path truncation', function() {
    assert.equal(utils.truncateBasePath('app/scripts/apps/vegetables/broccoli'), 'vegetables/broccoli');
  });
});
