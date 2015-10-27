'use strict';

var utils = require('../generators/utils');
var chai = require('chai');
var assert = chai.assert;
var path = require('path');

describe('utils', function() {
  it('model file name', function() {
    assert.equal(utils.fileName('people', utils.type.model), 'people_model', 'Model file name are equal');
  });
  it('model file name with type in name', function() {
    assert.equal(utils.fileName('people_model', utils.type.model), 'people_model', 'Model file name are equal');
  });
  it('model test file name', function() {
    assert.equal(utils.testName('people', utils.type.model), 'people_model_test', 'Model test file name are equal');
  });
  it('model with path', function() {
    assert.equal(utils.fileNameWithPath('people', 'people', utils.type.model), path.join('app', 'scripts', 'apps', 'people', 'people_model.js'), 'Model test file name are equal');
  });
  it('layoutview with path', function() {
    assert.equal(utils.fileNameWithPath('my_example', 'my_example', utils.type.layoutview), path.join('app', 'scripts', 'apps', 'my_example', 'my_example_layout_view.js'), 'Layout view file name are equal');
  });
  it('layoutview with type in name', function() {
    assert.equal(utils.fileNameWithPath('my_example', 'my_example_layout_view', utils.type.layoutview), path.join('app', 'scripts', 'apps', 'my_example', 'my_example_layout_view.js'), 'Layout view file name are equal');
  });
  it('model AMD', function() {
    assert.equal(utils.amd('people', utils.type.model), './people_model', 'Model AMD paths are equal');
  });
  it('model AMD with file name', function() {
    assert.equal(utils.amd('people_model', utils.type.model), './people_model', 'Model AMD paths are equal');
  });
// <<<<<<< HEAD
//   it('amd handles custom direcotry', function() {
//     assert.equal(utils.amd('people_model', utils.type.model, 'customDirecotry'), 'apps/customDirecotry/people_model', 'Model AMD paths are equal');
// =======
  it('amd handles custom directory', function() {
    assert.equal(utils.amd('people_model', utils.type.model, 'custom/directory'), 'apps/custom/directory/people_model', 'Model AMD paths are equal');
  });
  it('amd handles custom directory on windows', function() {
    assert.equal(utils.amd('people_model', utils.type.model, 'custom\\directory'), 'apps/custom/directory/people_model', 'Model AMD paths are equal');
  });
  it('amd handles custom directory on windows', function() {
    assert.equal(utils.amd('people_model', utils.type.model, 'app\\scripts\\apps\\cool'), 'apps/cool/people_model', 'Model AMD paths are equal');
  });
  it('model ClassName', function() {
    assert.equal(utils.className('people', utils.type.model), 'PeopleModel', 'Model ClassName are equal');
  });
  it('compositeview ClassName', function() {
    assert.equal(utils.className('people', utils.type.compositeview), 'PeopleCompositeView', 'CompositeView ClassName are equal');
  });
  it('collection file name', function() {
    assert.equal(utils.getCollectionFileName('people'), 'people_collection', 'Model file name are equal');
  });
  it('test name', function() {
    assert.equal(utils.testName('people', utils.type.collection), 'people_collection_test', 'Test name');
  });
  it('test name with type', function() {
    assert.equal(utils.testName('people_collection', utils.type.collection), 'people_collection_test', 'Test name');
  });
  it('test name with path', function() {
    assert.equal(utils.testNameWithPath('people', 'people', utils.type.collection), path.join('app', 'scripts', 'apps', 'people', 'people_collection_test.js'), 'Test name');
  });
  it('template templateName file name', function() {
    assert.equal(utils.templateName('my_example', utils.type.layoutview), 'my_example_layout_view_template.hbs');
  });
  it('template templateName file name with suffix', function() {
    assert.equal(utils.templateName('my_example_composite_view_template', utils.type.compositeview), 'my_example_composite_view_template.hbs');
  });
  it('template templateName file name with template in name', function() {
    assert.equal(utils.templateName('my_template_test', utils.type.compositeview), 'my_template_test_composite_view_template.hbs');
  });
  it('template templateNameWithPath path', function() {
    assert.equal(utils.templateNameWithPath('address', 'address', utils.type.itemview), 'app/scripts/apps/address/address_item_view_template.hbs', 'Template paths are equal');
  });
  it('template templateNameWithPath path with type in name', function() {
    assert.equal(utils.templateNameWithPath('my_example', 'my_example_layout_view', utils.type.layoutview), 'app/scripts/apps/my_example/my_example_layout_view_template.hbs', 'Template paths are equal');
  });
  it('template templateNameWithPath', function() {
    assert.equal(utils.templateNameWithPath('address', 'address', utils.type.compositeview), 'app/scripts/apps/address/address_composite_view_template.hbs');
  });
  it('template file name', function() {
    assert.equal(utils.templateName('my_example', utils.type.layoutview), 'my_example_layout_view_template.hbs');
  });
  it('template templateNameWithPath with extension in name', function() {
    assert.equal(utils.templateNameWithPath('my_directory', 'my_template.hbs', utils.type.compositeview), 'app/scripts/apps/my_directory/my_template.hbs');
  });
  it('template file name with suffix', function() {
    assert.equal(utils.templateName('my_example_composite_view_template', utils.type.compositeview), 'my_example_composite_view_template.hbs');
  });
  it('templatefileName', function() {
    assert.equal(utils.templateName('my_test', utils.type.compositeview), 'my_test_composite_view_template.hbs');
    assert.equal(utils.templateName('my_test_composite_view_template', utils.type.compositeview), 'my_test_composite_view_template.hbs');
    assert.equal(utils.templateName('my_test_composite_view_template.hbs', utils.type.compositeview), 'my_test_composite_view_template.hbs');
  });
  it('template file name with template in name', function() {
    assert.equal(utils.templateName('my_template_test', utils.type.compositeview), 'my_template_test_composite_view_template.hbs');
  });
  it('expanded path truncation', function() {
    assert.equal(utils.truncateBasePath('app/scripts/apps/vegetables/broccoli'), 'vegetables/broccoli');
  });
});
