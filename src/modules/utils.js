const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

exports.getAllFoldersFromPath = function (mainPath) {
  return fs.readdirSync(mainPath).filter(f => fs.statSync(path.join(mainPath, f)).isDirectory());
}

exports.moveFileToDirectory = function (file, pathToDirectory) {
  fs.renameSync(file, path.resolve(pathToDirectory, path.basename(file)));
};

exports.checkPath = function (path) {
  if (fs.existsSync(path)) {
    return path;
  }
  throw `Err! Invalid path: ${path}`;
  return '';
}