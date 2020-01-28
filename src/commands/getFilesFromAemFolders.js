const fs = require('fs-extra')
const { sep } = require('path')
const { getAllFoldersFromPath, moveFileToDirectory } = require('../modules/utils.js');

module.exports = function (pathFrom, pathTo) {
    const foldersArray = getAllFoldersFromPath(pathFrom);

    foldersArray.forEach(folder => {
        const pathToFolder = pathFrom + sep + folder;
        const tempFolderName = `${pathToFolder}_temp`;

        fs.renameSync(pathToFolder, tempFolderName);
        const folderFiles = fs.readdirSync(tempFolderName);
        folderFiles.forEach(file => {
            moveFileToDirectory(tempFolderName + sep + file, pathTo);
            fs.removeSync(tempFolderName);
        });
    });
}