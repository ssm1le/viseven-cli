import { getFile } from '../modules/utils';
import pdf from '../modules/pdf'

export async function convertPdf(pathToPdf) {
    const pdfSize = await getPdfSize(pathToPdf);
    console.log(`Width: ${pdfSize.width}px | Height: ${pdfSize.height}px`);

    pdf.convert(pathToPdf)
        .then((images) => {
            console.log(images);
        })
        .catch(e => {
            console.log(e.toString());
        })
        .then(() => {
            pdf.getCountConvertTime().then(count => {
                console.log(count);
                return count;
            })

        })

}
async function getPdfSize(pathToPdf) {
    const dataBuffer = getFile(pathToPdf);
    return await pdf.getPdfSize(dataBuffer);
}