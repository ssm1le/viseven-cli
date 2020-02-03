import { writeFileSync } from 'fs-extra';
import { resolve } from 'path';
import { getConfigFile } from '../modules/utils';

export function setApiKey(key) {
    const config = getConfigFile();
    const apiObj = getConfigObj(key);
    writeFileSync(resolve(__dirname, "../config.json"), JSON.stringify({ ...config, ...apiObj }));
}

function getConfigObj(key) {
    return {
        "apiKey": key
    };
}