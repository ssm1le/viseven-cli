import fs from 'fs-extra';
import { PDFDocument } from 'pdf-lib'
import convertapi from '../modules/convertapi'

export async function convertPdf(pathToPdf) {
    const pdfSize = await getPdfSize(pathToPdf);
    console.log(`Width: ${pdfSize.width}px | Height: ${pdfSize.height}px`);

    convertapi.convert(pathToPdf)
        .then(() => {
            console.log(images);
        })
        .catch(e => {
            console.log(e.toString());
        })
}

async function getPdfSize(pathToPdf) {
    const dataBuffer = await fs.readFile(pathToPdf);
    const pdfDoc = await PDFDocument.load(dataBuffer);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    return { width, height };
}