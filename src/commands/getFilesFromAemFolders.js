const fs = require('fs-extra')
const { join } = require('path')
const { getAllFoldersFromPath, moveFileToDirectory } = require('../modules/utils.js');

module.exports = function (pathFrom, pathTo) {
    const foldersArray = getAllFoldersFromPath(pathFrom);

    foldersArray.forEach(folder => {
        const pathToFolder = join(pathFrom, folder);
        const tempFolderName = pathToFolder + "_temp";

        fs.renameSync(pathToFolder, tempFolderName);
        const folderFiles = fs.readdirSync(tempFolderName);
        folderFiles.forEach(file => {
            moveFileToDirectory(join(tempFolderName, file), pathTo);
            fs.removeSync(tempFolderName);
        });
    });
}