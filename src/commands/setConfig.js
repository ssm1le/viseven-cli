import config from '../modules/config';
import tinify from '../modules/tinify';
import chalk from 'chalk';

export function setApiKey(key) {
    tinify.setKey(key);
    tinify.validate(key)
        .then(() => {
            config.setConfig(tinify.getKeyConfigObj(key));
            console.log(chalk.green("Api key is added!"));
        })
        .catch((err) => {
            console.log(chalk.red(err));
        })

}