import tinify from '../modules/tinify';
import { getImagesFilesFromFolder } from '../modules/utils';

export function compressImages(pathToFolder) {
    return new Promise((resolve, reject) => {
        const images = getImagesFilesFromFolder(pathToFolder);
        tinify.validate()
            .then(() => {
                return compress(images);
            })
            .then(() => {
                const compressionCount = tinify.getCompressionCount();
                const imagesCount = images.length;
                const maxCount = tinify.getMaxCount();
                if (compressionCount >= maxCount) {
                    reject('Maximum limit for this key reached!');
                }
                resolve({ compressionCount, imagesCount, maxCount });
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