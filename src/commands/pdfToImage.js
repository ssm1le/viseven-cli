const PDF2Pic = require("pdf2pic");
import fs from 'fs-extra';
const pdf = require('pdf-parse');

export function convert(path) {
    console.log(path);
    
    let dataBuffer = fs.readFileSync(path);

    pdf(dataBuffer).then(function (data) {

        // number of pages
        // console.log(data.numpages);
        // number of rendered pages
        // console.log(data.numrender);
        // PDF info
        console.log(data.info);
        // PDF metadata
        // console.log(data.metadata);
        // PDF.js version
        // check https://mozilla.github.io/pdf.js/getting_started/
        // console.log(data.version);
        // PDF text
        // console.log(data.text);

    });

    // const pdf2pic = new PDF2Pic({
    //     density: 100,           // output pixels per inch
    //     savename: "untitled",   // output file name
    //     savedir: "./images",    // output file location
    //     format: "jpg",          // output file format
    //     size: "600x600"         // output size in pixels
    // });

    // pdf2pic.convertBulk("path/to/pdf/sample.pdf", -1).then((resolve) => {
    //     console.log("image converter successfully!");

    //     return resolve;
    // });
}