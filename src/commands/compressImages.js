const tinify = require("tinify");
const { imagesFiles } = require('../modules/utils.js');

const API_KEY = "FJWkXhYrxJBfXv00blrJGm0gt798c97k";

module.exports = function (pathToImage) {
    tinify.key = API_KEY;
    let getImages = imagesFiles(pathToImage);
    
    getImages.forEach(img => {
        tinify.fromFile(img).toFile(img);
    });
}