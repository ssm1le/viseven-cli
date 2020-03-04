import { readJSONSync, writeJSONSync } from 'fs-extra';
import { resolve } from 'path';
import { writeJSON } from '../utils';

const DEFAULT_CONFIG_PATH = resolve(__dirname, '../../config.json');

export default {
    init(tiny = "", pdf = "") {
        let configObj = {};
        configObj.apiKey = tiny;
        configObj.pdfApiKey = pdf;

        writeJSON(DEFAULT_CONFIG_PATH, configObj);
    },
    getConfig() {
        return readJSONSync(DEFAULT_CONFIG_PATH, 'utf8');
    },
    setConfig(config) {
        const currentConfig = this.getConfig();
        return new Promise((resolve) => {
            writeJSONSync(DEFAULT_CONFIG_PATH, { ...currentConfig, ...config });
            resolve();
        })
    }
};