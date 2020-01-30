#!/usr/bin/env node
const commander = require('commander');
const chalk = require('chalk');
const { version } = require('./package.json');
const { checkPath } = require('./src/modules/utils.js');

const extractFiles = require('./src/commands/getFilesFromAemFolders');
const compressImages = require('./src/commands/compressImages');

commander
	.version(version);

commander
	.command('img [pathTo]')
	.description('Get pictures from aem folders')
	.action(function (pathTo) {
		try {
			const pathFrom = process.cwd();
			pathTo = pathTo && checkPath(pathTo) || pathFrom;
			extractFiles(pathFrom, pathTo);
			console.log(chalk.white.bgGreen.bold("Pictures moved!"));
		}
		catch (err) {
			console.log(chalk.red(err));
		}
	});

commander
	.command('compress')
	.description('Compress images')
	.action(function () {
		const pathToImage = process.cwd();
		compressImages(pathToImage);
		console.log(chalk.white.bgGreen.bold("Compressed!"));
	});

commander
	.command('test')
	.description('test')
	.action(function () {
		console.log(chalk.white.bgGreen.bold("test"));
	});



commander
	.parse(process.argv);