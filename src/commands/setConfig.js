const Config = require('../modules/config').Config;

export function setApiKey(key) {
    const conf = new Config();
    conf.setApiKey(key);
}