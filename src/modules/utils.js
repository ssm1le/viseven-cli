import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';

export function getAllFoldersFromPath(mainPath) {
  return fs.readdirSync(mainPath).filter(f => fs.statSync(path.join(mainPath, f)).isDirectory());
}

export function getImagesFilesFromFolder(pathToFolder) {
  const isDirectory = source => fs.lstatSync(source).isDirectory();
  return glob.sync(`${pathToFolder}${path.sep}**${path.sep}*.{png,jpg}`).filter(itemPath => !isDirectory(itemPath));
}

export function moveFileToDirectory(file, pathToDirectory) {
  fs.renameSync(file, path.resolve(pathToDirectory, path.basename(file)));
}

export function getConfigFile() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "..", "config.json"), 'utf8'));
}