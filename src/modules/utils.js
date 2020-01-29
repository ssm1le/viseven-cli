const fs = require('fs-extra');
const path = require('path');

exports.getAllFoldersFromPath = function (mainPath) {
  return fs.readdirSync(mainPath).filter(f => fs.statSync(path.join(mainPath, f)).isDirectory());
}

exports.moveFileToDirectory = function (file, pathToDirectory) {
  fs.renameSync(file, path.resolve(pathToDirectory, path.basename(file)));
};

exports.checkPath = function (pathForCheck) {
  if (fs.existsSync(pathForCheck)) {
    return pathForCheck;
  }
  throw `Err! Invalid path: ${pathForCheck}`;
}