import { readJSONSync, writeJSONSync } from 'fs-extra';
import { resolve } from 'path';

const DEFAULT_CONFIG_PATH = resolve(__dirname, '../../config.json');

export default {
    getConfig() {
        return readJSONSync(DEFAULT_CONFIG_PATH, 'utf8');
    },
    setConfig(config) {
        const currentConfig = this.getConfig();
        writeJSONSync(DEFAULT_CONFIG_PATH, {...currentConfig, ...config});
    }
};