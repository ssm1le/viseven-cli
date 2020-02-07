import config from '../modules/config';
import tinify from '../modules/tinify';

export function setApiKey(key) {
    tinify.setKey(key);
    return tinify.validate(key).then(() => {
        return config.setConfig(tinify.getKeyConfigObj(key));
    })
}

export function getApiKey() {
    return new Promise((resolve) => {
        resolve(tinify.getKey())
    });
}