'use strict';
var utils = require('./utils');
var fs = require('fs');

function templatesOption(directory, template, type) {
  try {
    fs.statSync(utils.templateNameWithPath(directory, template, type));
  }
  catch (e) {
    console.log('Template does not exist');
    process.exit(1);
  }
}

module.exports = {templatesOption: templatesOption};
