import tinify from 'tinify';
import { getImagesFilesFromFolder, getConfigFile } from '../modules/utils';

const API_KEY = getConfigFile().apiKey;

export function compressImages (pathToImage) {
    tinify.key = API_KEY;
    compressed(getImagesFilesFromFolder(pathToImage));
}

function compressed(images) {
    tinify.validate((err) => {
        if (err) {
            if (err.message.indexOf("Error while connecting") !== -1) {
                console.log("Error: You seem to have trouble with network connection");
            } else {
                console.log("Error: Your API key is not yet set, or it's invalid");
            }
        } else {
            console.log(`You optimized ${tinify.compressionCount} images this month, max number of free images is 500`);
            images.forEach(img => {
                tinify.fromFile(img).toFile(img);
            });
        }
    });
}