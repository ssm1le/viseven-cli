import config from '../modules/config';

export function setApiKey(key) {
    config.setConfig({ "apiKey": key });
}