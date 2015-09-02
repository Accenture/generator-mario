'use strict';
var utils = require('./utils');
var fs = require('fs');

function verifyPath(directory, name, type) {
  try {
    if (type === utils.type.tempalte) {
      console.log('Trying template: ', utils.templateNameWithPath(directory, name, type));
      fs.statSync(utils.templateNameWithPath(directory, name, type));
    } else {
      console.log('Trying fileName: ', utils.fileNameWithPath(directory, name, type));
      fs.statSync(utils.fileNameWithPath(directory, name, type));
    }
  }
  catch (e) {
    console.log(name + ' does not exist');
    process.exit(1);
  }
}

module.exports = {
  verifyPath: verifyPath
};
