import config from '../../modules/config';
import { join } from 'path';
import convertapiPackage from 'convertapi';
const convertapi = convertapiPackage('jmZJT3WkdWUjV1oc');

const MAX_TIME_CONVERTING_PDF = 1500;
const CONFIG_KEY = "pdfApiKey";

export default {
    getMaxTime() {
        return MAX_TIME_CONVERTING_PDF;
    },
    getKey() {
        return config.getConfig()[CONFIG_KEY];
    },
    getKeyConfigObj(key) {
        return { [CONFIG_KEY]: key }
    },
    getCountConvertTime() {
        return "";
    },
    convert(pathToPdf) {
        return new Promise((resolve, reject) => {
            let conf = {
                File: pathToPdf,
                JpgQuality: '100',
                FileName: 'slide'
            }

            convertapi.convert('png', conf, 'pdf')
                .then(result => {
                    return result.saveFiles(join(__dirname, 'images'));
                })
                .then(filesPath => {
                    resolve(filesPath);
                })
                .catch(e => {
                    console.error(e.toString());
                    reject()
                });
        })
    }
}