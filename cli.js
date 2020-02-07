
import commander from 'commander';
import chalk from 'chalk';

import { extractFiles } from './src/commands/getFilesFromAemFolders';
import { compressImages } from './src/commands/compressImages';
import { setApiKey } from './src/commands/setConfig';

const { version } = require('./package.json');

commander
	.version(version);

commander
	.command('file [pathTo]')
	.description('Get files from AEM folder')
	.action((pathTo = process.cwd()) => {
		console.log(chalk.yellow("Start moving files"));
		extractFiles(process.cwd(), pathTo)
			.then(() => {
				console.log(chalk.green("Files moved!"))
			})
			.catch((err) => {
				console.error(chalk.red(err));
			});
	});

commander
	.command('press')
	.description('Compress images')
	.action(() => {
		console.log(chalk.yellow("Compress in progress!"));
		compressImages(process.cwd())
			.then(({ compressionCount, imagesCount, maxCount }) => {
				console.log(chalk.yellow(`You optimized ${chalk.red(compressionCount)} images on this month, max number of free images is ${chalk.red(maxCount)}`));
				console.log(chalk.green(`Done! Optimized ${imagesCount} images`));
			})
			.catch((err) => {
				console.error(chalk.red(err));
			});
	});

commander
	.command('key <key>')
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