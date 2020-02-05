
import commander from 'commander';
import chalk from 'chalk';

import { getValidPath } from './src/modules/utils';
import { extractFiles } from './src/commands/getFilesFromAemFolders';
import { compressImages } from './src/commands/compressImages';
import { setApiKey } from './src/commands/setConfig';

const { version } = require('./package.json');

commander
	.version(version);

commander
	.command('file [pathTo]')
	.description('Get files from AEM folder')
	.action((pathTo) => {
		try {
			const pathFrom = process.cwd();
			pathTo = pathTo && getValidPath(pathTo) || pathFrom;

			console.log(chalk.yellow("Start moving files"));
			extractFiles(pathFrom, pathTo)
				.then(() => {
					console.log(chalk.green("Files moved!"))
				});
		}
		catch (err) {
			console.log(chalk.red(err));
		}
	});

commander
	.command('compress')
	.description('Compress images')
	.action(() => {
		const pathToImage = process.cwd();
		compressImages(pathToImage);
	});

commander
	.command('setApiKey <key>')
	.description('Set tinyfy api key')
	.action((key) => {
		setApiKey(key);
	});

commander
	.command('test')
	.description('test')
	.action(() => {
		console.log(chalk.white.bgGreen.bold("test"));
	});

commander
	.parse(process.argv);