import config from '../modules/config';
import tinify from '../modules/tinify';
import chalk from 'chalk';

export function setApiKey(key) {
    config.setConfig(tinify.getKeyConfigObj(key));
    console.log(chalk.green("Api key is added!"));
}