import config from '../../modules/config';
import convertapiPackage from 'convertapi';
import { PDFDocument } from 'pdf-lib'
import { join } from 'path';

const MAX_TIME_CONVERTING_PDF = 1500;
const CONFIG_KEY = "pdfApiKey";

export default {
    getMaxTime() {
        return MAX_TIME_CONVERTING_PDF;
    },
    getKey() {
        return config.getConfig()[CONFIG_KEY];
    },
    setKey(key = this.getKey()) {
        return convertapiPackage(key);
    },
    getKeyConfigObj(key) {
        return { [CONFIG_KEY]: key }
    },
    getCountConvertTime() {
        return new Promise((resolve, reject) => {
            const convertapi = this.setKey();
            convertapi.getUser()
                .then(info => {
                    resolve("Seconds left: " + info.SecondsLeft)
                })
                .catch(e => {
                    console.error(e.toString());
                    reject(e.toString());
                });
        })
    },
    convert(pathToPdf) {
        return new Promise((resolve, reject) => {
            const configure = {
                File: pathToPdf,
                PngQuality: '100',
                FileName: 'slide'
            }
            const convertapi = this.setKey();

            convertapi.convert('png', configure, 'pdf')
                .then(result => {
                    return result.saveFiles(join(process.cwd(), 'images'));
                })
                .then(filesPath => {
                    resolve(filesPath);
                })
                .catch(e => {
                    console.error(e.toString());
                    reject(e.toString());
                });
        })
    },
    async getPdfSize(dataBuffer) {
        const pdfDoc = await PDFDocument.load(dataBuffer);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();

        return { width, height };
    }
}