#!/usr/bin/env node
const commander = require('commander');
const chalk = require('chalk');
const { version } = require('./package.json');
const { checkPath } = require('./src/modules/utils.js');

const extractFiles = require('./src/commands/getFilesFromAemFolders');
const compressImages = require('./src/commands/compressImages');
const setApiKey = require('./src/commands/setConfig');

commander
	.version(version);

commander
	.command('file [pathTo]')
	.description('Get files from aem folders')
	.action((pathTo) => {
		try {
			const pathFrom = process.cwd();
			pathTo = pathTo && checkPath(pathTo) || pathFrom;
			extractFiles(pathFrom, pathTo);
			console.log(chalk.white.bgGreen.bold("Files moved!"));
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
		console.log(chalk.white.bgGreen.bold("Compress in progress!"));
	});

commander
	.command('setApiKey <key>')
	.description('Set tinyfy api key')
	.action((key) => {
		setApiKey(key);
		console.log(chalk.white.bgGreen.bold("Done"));
	});

commander
	.command('test')
	.description('test')
	.action(() => {
		console.log(chalk.white.bgGreen.bold("test"));
	});

commander
	.parse(process.argv);