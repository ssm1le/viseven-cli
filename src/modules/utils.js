import fs from 'fs-extra';
import path from 'path';

export function getAllFoldersFromPath(mainPath) {
  return fs.readdirSync(mainPath).filter(f => fs.statSync(path.join(mainPath, f)).isDirectory());
}

export function getImagesFilesFromFolder(pathToFolder) {
  return fs.readdirSync(pathToFolder, 'utf8').filter(fn => fn.endsWith('.png') || fn.endsWith('.jpg'));
}

export function moveFileToDirectory(file, pathToDirectory) {
  fs.renameSync(file, path.resolve(pathToDirectory, path.basename(file)));
}

export function getConfigFile() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "..", "config.json"), 'utf8'));
}