const tinify = require("tinify");
const { imagesFiles, getConfigFile } = require('../modules/utils.js');
const API_KEY = getConfigFile().apiKey;

module.exports = function (pathToImage) {
    tinify.key = API_KEY;
    compressed(imagesFiles(pathToImage));
}

function compressed(images) {
    tinify.validate((err) => {
        if (err) {
            if (err.message.indexOf("Error while connecting") !== -1) {
                console.log("Error: You seem to have trouble with network connection");
            } else {
                console.log("Error: Your API key is not yet set, or it's invalid");
            }
        } else {
            console.log(`You optimized ${tinify.compressionCount} images this month, max number of free images is 500`);
            images.forEach(img => {
                tinify.fromFile(img).toFile(img);
            });
        }
    });
}