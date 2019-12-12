require('winston-daily-rotate-file');
const winston = require('winston');
const fs = require('fs');
const path = require('path');

const loggerPath = './src/logger/log';

async function initFolder () {
	let result = fs.existsSync(loggerPath);

	if (!result) fs.mkdirSync(loggerPath);
}


function getLoggerTransports () {
	const transports = [
		new winston.transports.DailyRotateFile({
			level       : 'info',
			filename    : '.log',
			dirname     : './src/logger/log',
			datePattern : 'yyyy-MM-dd',
			prepend     : true,
			json        : false,
			colorize    : false
		}),
		new winston.transports.Console({
			level            : 'debug',
			handleExceptions : true,
			json             : false,
			colorize         : true
		})
	];

	return transports;
}

function initLogger () {
	initFolder();

	const logger = new winston.Logger({
		transports  : getLoggerTransports(),
		exitOnError : false
	});

	logger.stream = {
		write : function (message: any, encoding: any) {
			logger.info(message);
		}
	};

	return logger;
}

const logger = initLogger();

exports.Logger = class Logger {
  private name: string;
  private logger: any;

  constructor(name: string) {
    this.name = `${name} - `;
    this.logger = logger;
  }

  getLogger () {
		return this.logger;
  };
  
  log (level: string, msg: string) {
		this.logger.log(level, this.name, msg);
	}

	debug (msg: string) {
		this.logger.info(this.name, msg);
	}

	info (msg: string) {
		this.logger.info(this.name, msg);
	}

	warn (msg: string) {
		this.logger.warn(this.name, msg);
	}

	error (msg: string) {
		this.logger.error(this.name, msg);
	}
}