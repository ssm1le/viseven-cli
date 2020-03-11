
import commander from 'commander';
import chalk from 'chalk';

import { init as test } from './src/commands/regPdfApikey';
import { convertPdf } from './src/commands/pdfToImage';
import { extractFiles } from './src/commands/getFilesFromAemFolders';
import { compressImages } from './src/commands/compressImages';
import { init, setApiKey, getApiKey, getApiKeyCount } from './src/commands/apiKeyConfig';

const { version } = require('./package.json');

commander
	.version(version);

commander
	.command('file [pathTo]')
	.alias('f')
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
	.alias('p')
	.option('-a, --all', "Compress pictures in all child folders")
	.description('Compress images')
	.action((args) => {
		args.all ? console.log(args.all) : "";
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
	.command('key [key]')
	.alias('k')
	.description('Set/Get tinyfy api key')
	.action((key) => {
		if (key) {
			setApiKey(key)
				.then(() => {
					console.log(chalk.green("API key is added!"));
				})
				.catch((err) => {
					console.error(chalk.red(err));
				});
		} else {
			getApiKey()
				.then(key => {
					console.log(chalk.green(key));
					return getApiKeyCount(key);
				})
				.then(key => {
					console.log(`Compression count: ${chalk.red(key)}`);
				});
		}
	});

commander
	.command('project')
	.alias('i')
	.description('Init project')
	.action(() => {
		console.log(chalk.white.bgGreen.bold("test"));
	});

commander
	.command('test')
	.alias('t')
	.description('test')
	.action(() => {
		test();
	});

commander
	.command('config')
	.alias('c')
	.description('Config init')
	.option('-p, --pdf <key>', "Set pdf api key")
	.option('-t, --tiny <key>', "Set tiny api key")
	.action((args) => {
		init(args)
			.then(() => {
				console.log(chalk.green("Inited!"));
			})
	});

commander
	.parse(process.argv);