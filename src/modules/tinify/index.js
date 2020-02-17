import tinify from 'tinify';
import config from '../../modules/config';

const MAX_COUNT_OPTIMIZE_IMAGES = 500;
const CONFIG_KEY = "apiKey";

export default {
    getMaxCount() {
        return MAX_COUNT_OPTIMIZE_IMAGES;
    },
    getKey() {
        return config.getConfig()[CONFIG_KEY];
    },
    setKey(key = this.getKey()) {
        tinify.key = key;
    },
    getKeyConfigObj(key) {
        return { [CONFIG_KEY]: key }
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
    validate(key) {
        this.setKey(key);
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