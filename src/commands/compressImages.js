import tinify from '../modules/tinify';
import { getImagesFilesFromFolder } from '../modules/utils';

export function compressImages(pathToFolder) {
    return new Promise((resolve, reject) => {
        const images = getImagesFilesFromFolder(pathToFolder);
        tinify.setKey();
        tinify.validate()
            .then(() => {
                return compress(images);
            })
            .then(() => {
                resolve({ compressionCount: tinify.getCompressionCount(), imagesCount: images.length, maxCount: tinify.getMaxCount() });
            })
            .catch((err) => {
                reject(err);
            });
    })
}

function compress(images) {
    return new Promise((resolve, reject) => {
        const promiseArrayImages = images.map((img) => {
            return tinify.compress(img);
        });
        Promise.all(promiseArrayImages)
            .then(resolve)
            .catch((err) => {
                reject(err)
            })
    })
}