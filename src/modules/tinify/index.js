import tinify from 'tinify';
import config from '../modules/config';

const MAX_COUNT_OPTIMIZE_IMAGES = 500;

export default {
    getMaxCount() {
        return MAX_COUNT_OPTIMIZE_IMAGES;
    },
    getKey() {
        return config.getConfig().apiKey;
    },
    setKey(key = this.getKey()) {
        tinify.key = key;
    },
    getKeyConfigObj(key) {
        return { "apiKey": key }
    },
    compress(pathToImage) {
        return new Promise((resolve) => {
            tinify.fromFile(pathToImage).toFile(pathToImage, () => {
                resolve();
            });
        })
    },
    validate(callback, ...args) {
        return new Promise((resolve, reject) => {
            tinify.validate((err) => {
                if (err) {
                    reject(err.message);
                }
                callback(resolve, args);
            });
        })
    }
}