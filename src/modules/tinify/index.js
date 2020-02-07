import tinify from 'tinify';
import config from '../../modules/config';

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
    getCompressionCount() {
        return tinify.compressionCount;
    },
    compress(pathToImage) {
        return new Promise((resolve) => {
            tinify.fromFile(pathToImage).toFile(pathToImage, () => {
                resolve();
            });
        })
    },
    validate() {
        return new Promise((resolve, reject) => {
            tinify.validate((err) => {
                if (err) {
                    reject(err.message);
                }
                resolve();
            });
        })
    }
}