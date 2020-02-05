import config from '../modules/config';
import chalk from 'chalk';

export function setApiKey(key) {
    config.setConfig({ "apiKey": key });
    console.log(chalk.green("Api key is added!"));
}