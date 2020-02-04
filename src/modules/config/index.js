import fs from 'fs-extra';
import path from 'path';
const DEFAULT_CONFIG_PATH = path.resolve(__dirname, '../../config.json')
export class Config {
    constructor() {

    }

    getConfigFile() {
        return JSON.parse(fs.readFileSync(DEFAULT_CONFIG_PATH, 'utf8'));
    }

    getConfigObj(key) {
        return {
            "apiKey": key
        }
    }

    setApiKey(key) {
        const config = this.getConfigFile();
        const apiObj = this.getConfigObj(key);
        fs.writeFileSync(DEFAULT_CONFIG_PATH, JSON.stringify({ ...config, ...apiObj }));
    }
}