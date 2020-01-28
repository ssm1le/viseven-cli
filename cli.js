#!/usr/bin/env node
const commander = require('commander');
const getImage = require('./src/commands/getPicturesFromAemFolders');
const { version } = require('./package.json');
const chalk = require('chalk');

commander
	.version(version);

commander
	.command('img [pathTo]')
	.description('Get pictures from aem folders')
	.action(function (pathTo) {
		const pathFrom = process.cwd();
		pathTo = pathTo || pathFrom;
		getImage(pathFrom, pathTo);
		console.log(chalk.white.bgRed.bold("Misha vse ZBS!!! Gulayem :D."));
	});

commander	
	.command('test')
	.description('test')
	.action(function () {
		console.log(chalk.white.bgRed.bold("test"));
	});

commander
	.parse(process.argv);