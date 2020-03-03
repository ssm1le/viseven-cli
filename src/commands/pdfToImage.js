import fs from 'fs-extra';
import { PDFDocument } from 'pdf-lib'
const PDF2Pic = require("pdf2pic");

export async function convertPdf(pathToPdf) {
    const pdfSize = await getPdfSize(pathToPdf);

    const pdf2pic = new PDF2Pic({
        savedir: "./images",    // output file location
        format: "jpeg"         // output file format
    });

    pdf2pic.convert(pathToPdf)
        .then((resolve) => {
            console.log("image converter successfully!");

            return resolve;
        })

    console.log(`Width: ${pdfSize.width}px | Height: ${pdfSize.height}px`);
}

async function getPdfSize(pathToPdf) {
    const dataBuffer = await fs.readFile(pathToPdf);
    const pdfDoc = await PDFDocument.load(dataBuffer);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    return { width, height };
}
