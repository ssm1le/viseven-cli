import fs from 'fs-extra';
import path from 'path';
import { getConfigFile } from '../modules/utils';

export function setApiKey(key) {
    const config = getConfigFile();
    const apiObj = getConfigObj(key);
    fs.writeFileSync(path.join(__dirname, "..", "config.json"), JSON.stringify({ ...config, ...apiObj}));
}

function getConfigObj(key) {
    return {
        "apiKey": key
    };
}