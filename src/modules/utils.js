import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';

const isDirectory = source => fs.lstatSync(source).isDirectory();

export function getAllFoldersFromPath(mainPath) {
  return fs.readdirSync(mainPath).filter(f => isDirectory(path.resolve(mainPath, f)));
}

export function getImagesFilesFromFolder(pathToFolder) {
  return glob.sync(`${pathToFolder}${path.sep}**${path.sep}*.{png,jpg}`).filter(file => !isDirectory(file));
}

export function moveFileToDirectory(file, pathToDirectory) {
  fs.renameSync(file, path.resolve(pathToDirectory, path.basename(file)));
}

export function getConfigFile() {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, "../config.json"), 'utf8'));
}