import fs from 'fs-extra';
import { join } from 'path';
import { getAllFoldersFromPath, moveFileToDirectory } from '../modules/utils';

export function extractFiles(pathFrom, pathTo) {
    return new Promise((resolve)=>{
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
        resolve();
    })
}