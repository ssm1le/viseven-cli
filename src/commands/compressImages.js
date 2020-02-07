import tinify from '../modules/tinify';
import { getImagesFilesFromFolder } from '../modules/utils';


export function compressImages(pathToFolder) {
    tinify.setKey();
    return new Promise((resolve, reject) => {
        compressed(getImagesFilesFromFolder(pathToFolder))
            .then(({ compressionCount, imagesCount }) => {
                resolve({ compressionCount, imagesCount, maxCount: tinify.getMaxCount() });
            })
            .catch((err) => {
                reject(err);
            });
    })
}

function compressed(images) {
    return new Promise((resolve, reject) => {
        tinify.validate()
            .then(() => {
                compress(images)
                    .then(({ compressionCount, imagesCount }) => {
                        resolve({ compressionCount, imagesCount });
                    });
            })
            .catch((err) => {
                reject(err);
            })
    })
}

function compress(images) {
    return new Promise((resolve, reject) => {
        const promiseArrayImages = images.map((img) => {
            return tinify.compress(img);
        });
        Promise.all(promiseArrayImages)
            .then(() => {
                console.log( tinify.getCompressionCount());
                resolve({ compressionCount: tinify.getCompressionCount(), imagesCount: images.length });
            })
            .catch((err) => {
                reject(err)
            })
    })

}