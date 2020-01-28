const fs = require('fs-extra')
const path = require('path')

module.exports = function (pathFrom, pathTo) {
    const foldersArray = getFoldersFromPath(pathFrom);

    foldersArray.forEach(folder => {
        const pathToFolder = pathFrom + path.sep + folder;
        const tempFolderName = `${pathToFolder}_temp`;

        fs.renameSync(pathToFolder, tempFolderName);
        const folderFiles = fs.readdirSync(tempFolderName);
        folderFiles.forEach(file => {
            moveFile(tempFolderName + path.sep + file, pathTo);
            fs.removeSync(tempFolderName);
        });
    });
}

function getFoldersFromPath(mainPath) {
    return fs.readdirSync(mainPath).filter(f => fs.statSync(path.join(mainPath, f)).isDirectory());
}

function moveFile(file, dir2) {
    fs.renameSync(file, path.resolve(dir2, path.basename(file)));
};