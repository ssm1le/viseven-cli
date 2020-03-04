import fs from 'fs-extra';
import { sep } from 'path'
import { PDFDocument } from 'pdf-lib'
import convertapiPackage from 'convertapi';
const convertapi = convertapiPackage('jmZJT3WkdWUjV1oc');

export async function convertPdf(pathToPdf) {
    const pdfSize = await getPdfSize(pathToPdf);
    console.log(`Width: ${pdfSize.width}px | Height: ${pdfSize.height}px`);

    let conf = {
        File: pathToPdf,
        JpgQuality: '100',
        FileName: 'slide'
    }

    convertapi.convert('png', conf, 'pdf')
        .then(result => {
            console.log("Converted file url: " + result.file.url);
            return result.saveFiles(process.cwd() + sep + 'images');
        })
        .then(filesPath => {
            console.log("Files path: " + filesPath);
        })
        .catch(e => {
            console.error(e.toString());
        });
}

async function getPdfSize(pathToPdf) {
    const dataBuffer = await fs.readFile(pathToPdf);
    const pdfDoc = await PDFDocument.load(dataBuffer);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    return { width, height };
}
