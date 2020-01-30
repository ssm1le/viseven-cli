const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

module.exports = function () {
    (async () => {
        const files = await imagemin(['*.{jpg,png}'], {
            destination: ``,
            plugins: [
                imageminJpegtran(),
                imageminPngquant({
                    quality: [0.6, 0.8]
                })
            ]
        });
        console.log(files);
    })();
}