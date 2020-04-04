import { readJSONSync, writeJSONSync, existsSync } from 'fs-extra';
import { resolve } from 'path';

const DEFAULT_CONFIG_PATH = resolve(__dirname, '../../config.json');
const DEFAULT_CONFIG = {
    pdfApiKey: "",
    tinifyApiKey: "",
    secretApiKey: ""
};

const Config = {
    getConfig() {
        if (!existsSync(DEFAULT_CONFIG_PATH)) return DEFAULT_CONFIG;
        return readJSONSync(DEFAULT_CONFIG_PATH, 'utf8');
    },
    setConfig(config) {
        const currentConfig = this.getConfig();

        return new Promise((resolve) => {
            writeJSONSync(DEFAULT_CONFIG_PATH, {...DEFAULT_CONFIG, ...currentConfig, ...config});
            resolve();
        })
    }
};

Object.freeze(Config);
export default Config;