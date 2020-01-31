const fs = require('fs-extra');
const path = require('path');
const { getConfigFile } = require('../modules/utils.js');

module.exports = function (key) {
    const config = getConfigFile();
    const apiObj = getConfigObj(key);
    fs.writeFileSync(path.join(__dirname, "..", "config.json"), JSON.stringify({ ...config, ...apiObj}));
}

function getConfigObj(key) {
    return {
        "apiKey": key
    };
}