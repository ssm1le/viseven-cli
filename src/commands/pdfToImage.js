import fs from 'fs-extra';
import { PDFDocument } from 'pdf-lib'

export async function convert(path) {

    const dataBuffer = await fs.readFile(path);
    const pdfDoc = await PDFDocument.load(dataBuffer);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    console.log(`Width: ${width}px | Height: ${height}px`);
}