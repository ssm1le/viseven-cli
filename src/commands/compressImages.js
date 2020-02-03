import tinify from 'tinify';
import chalk from 'chalk';
import { getImagesFilesFromFolder, getConfigFile } from '../modules/utils';

const MAX_COUNT_OPTIMIZE_IMAGES = 500;

export function compressImages(pathToFolder) {
    return new Promise((resolve) => {
        tinify.key = getConfigFile().apiKey;
        compressed(getImagesFilesFromFolder(pathToFolder))
            .then(({ compressionCount, imagesCount }) => {
                console.log(chalk.yellow(`You optimized ${chalk.red(compressionCount)} images on this month, max number of free images is ${chalk.red(MAX_COUNT_OPTIMIZE_IMAGES)}`));
                resolve(imagesCount);
            });
    })
}

function compressed(images) {
    return new Promise((resolve) => {
        tinify.validate((err) => {
            if (err) {
                console.error(chalk.red("The error message is: " + err.message));
            } else {
                const promiseArrayImages = images.map((img) => {
                    return compressImg(img);
                });
                Promise.all(promiseArrayImages, _ => {
                }).then(_ => {
                    resolve({ compressionCount: tinify.compressionCount, imagesCount: images.length });
                })
            }
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