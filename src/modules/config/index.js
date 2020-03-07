import { readJSONSync, writeJSONSync } from 'fs-extra';
import { resolve } from 'path';

const DEFAULT_CONFIG_PATH = resolve(__dirname, '../../config.json');

export default {
    init(args) {
        let configObj = {};

        if (args.pdf) configObj.pdfApiKey = args.pdf;
        else if (args.tiny) configObj.apiKey = args.tiny;
        else {
            configObj.pdfApiKey = "";
            configObj.apiKey = "";
        }

        return new Promise((resolve) => {
            resolve(this.setConfig(configObj));
        });
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