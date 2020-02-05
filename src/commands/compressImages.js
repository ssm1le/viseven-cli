import tinify from 'tinify';
import chalk from 'chalk';
import { getImagesFilesFromFolder } from '../modules/utils';
import config from '../modules/config';

const MAX_COUNT_OPTIMIZE_IMAGES = 500;

export function compressImages(pathToFolder) {
    return new Promise(() => {
        tinify.key = config.getConfig().apiKey;
        console.log(chalk.yellow("Compress in progress!"));

        compressed(getImagesFilesFromFolder(pathToFolder))
            .then(({ compressionCount, imagesCount }) => {
                console.log(chalk.yellow(`You optimized ${chalk.red(compressionCount)} images on this month, max number of free images is ${chalk.red(MAX_COUNT_OPTIMIZE_IMAGES)}`));
                console.log(chalk.green(`Done! Optimized ${imagesCount} images`));
            })
            .catch((err) => {
                console.error(chalk.red(err));
            });
    })
}

function compressed(images) {
    return new Promise((resolve, reject) => {
        tinify.validate((err) => {
            if (err) {
                reject();
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