import tinify from 'tinify';
import { getImagesFilesFromFolder } from '../modules/utils';
import config from '../modules/config';

const MAX_COUNT_OPTIMIZE_IMAGES = 500;

export function compressImages(pathToFolder) {
    tinify.key = config.getConfig().apiKey;
    return new Promise((resolve, reject) => {
        compressed(getImagesFilesFromFolder(pathToFolder))
            .then(({ compressionCount, imagesCount }) => {
                resolve({ compressionCount, imagesCount, MAX_COUNT_OPTIMIZE_IMAGES });
            })
            .catch((err) => {
                reject(err);
            });
    })
}

function compressed(images) {
    return new Promise((resolve, reject) => {
        tinify.validate((err) => {
            if (err) {
                reject(err.message);
            }

            const promiseArrayImages = images.map((img) => {
                return compressImg(img);
            });

            Promise.all(promiseArrayImages).then(() => {
                resolve({ compressionCount: tinify.compressionCount, imagesCount: images.length });
            })
        });
    })
}

function compressImg(pathToImage) {
    return new Promise((resolve) => {
        tinify.fromFile(pathToImage).toFile(pathToImage, () => {
            resolve();
        });
    })
}