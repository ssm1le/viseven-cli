#!/usr/bin/env node
const commander = require('commander');
const chalk = require('chalk');
const { version } = require('./package.json');
const { checkPath } = require('./src/modules/utils.js');

const extractFiles = require('./src/commands/getFilesFromAemFolders');

commander
	.version(version);

commander
	.command('img [pathTo]')
	.description('Get pictures from aem folders')
	.action(function (pathTo) {
		const pathFrom = process.cwd();
		pathTo = checkPath(pathTo) || pathFrom;
		extractFiles(pathFrom, pathTo);
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