/**
 * @name LogConfiguration
 * @type {Interface}
 * 
 * @description
 * This interface will be used when providing custom log configuration.
 * This is typically done only once and during the application startup.
 */
export interface LogConfiguration {

	/**
	 * @public
	 * @type {Boolean}
	 *
	 * @description
	 * Disable logging all together?
	 * By default it is set to false
	 */
	disable: boolean;

	/**
	 * @public
	 * @type {Boolean}
	 *
	 * @description
	 * Should the logger write in debug state?
	 * By default it is set to false.
	 */
	debug: boolean;

	/**
	 * @public
	 * @type {Logger|Logger[]}
	 *
	 * @description
	 * Any custom appenders can be added during the
	 * configuration stage.
	 */
	appenders?: Logger | Logger[];

}

/**
 * @name Logger
 * @type {Interface}
 *
 * @description
 * An interface to define a log appender that will write logs, 
 * and push those logs to the api log service.
 */
export interface Logger {

	/**
	 * @public
	 * @type {String}
	 *
	 * @description
	 * The name of the logger.
	 */
	name: string;

	/**
	 * @public
	 * @type {Function}
	 *
	 * @description
	 * The function used to write INFO log statements. 
	 * It can be used like so: logger.info('This is an info statement');
	 */
	info: Function;

	/**
	 * @public
	 * @type {Function}
	 *
	 * @description
	 * The function used to write DEBUG log statements. 
	 * It can be used like so: logger.debug('This is a debug statement');
	 */
	debug: Function;

	/**
	 * @public
	 * @type {Function}
	 *
	 * @description
	 * The function used to write WARM log statements. 
	 * It can be used like so: logger.warn('This is a warning statement');
	 */
	warn: Function;

	/**
	 * @public
	 * @type {Function}
	 *
	 * @description
	 * The function used to write ERROR log statements. 
	 * It can be used like so: logger.error('This is an error statement');
	 */
	error: Function;

}

/**
 * @name LoggerFactory
 * @author Jordan Alphonso
 * @created 05/31/2017
 *
 * @description
 * The LoggerFactory class provides an easy way to handle logging throughout
 * the application. There is the option to customize the LoggerFactory
 * by using the configure() method and passing a {@link LogConfiguration}.
 */
export class LoggerFactory {

	/**
	 * @private
	 * @static
	 * @type {Logger[]}
	 *
	 * @description
	 * This static array will hold all configured log appenders that are either
	 * initialized during configuration or created by the getLogger() function.
	 */	
	private static loggers: Logger[] = [];

	/**
	 * @private
	 * @static
	 * @type {Boolean} 
	 * 
	 * @description
	 * This boolean will determin whether the application will write debug
	 * logs or not. It has control over all loggers.
	 */
	private static debugEnabled: boolean = false;

	private static disabled: boolean = false;

	/**
	 * @public
	 * @static
	 * @type {Function}
	 * @return {Boolean}
	 *
	 * @description
	 * This functions checks to see if the LogConfiguration 
	 * disabled all together.
	 */
	public static isDisabled(): boolean {
		return LoggerFactory.disabled;
	}

	/**
	 * @public
	 * @static
	 * @type {Function}
	 * @return {Boolean}
	 *
	 * @description
	 * This functions checks to see if Debug statements are
	 * able to be logged.
	 */
	public static isDebugEnabled(): boolean {
		return LoggerFactory.debugEnabled;
	}

	/**
	 * @public
	 * @static
	 * @type {Function}
	 * @param {LogConfiguration} config
	 *
	 * @description
	 * When this function is triggered, it will override the default Log Configuration 
	 * with the passed config.
	 */
	public static configure(config: LogConfiguration): void {
		LoggerFactory.debugEnabled = config.debug;
		LoggerFactory.disabled = config.disable;
		let appenders: Logger[] = typeof config.appenders === 'object' ? [<Logger>config.appenders] : config.appenders;
		appenders.forEach((appender) => {
			LoggerFactory.loggers.push(appender);
		});
	}

	/**
	 * @public
	 * @static
	 * @type {Function}
	 * @param {String} name
	 * @return {Logger}
	 *
	 * @description
	 * This function will search for an already existing logger with the
	 * name provided and return it. If it cannot find a logger with this name, 
	 * then it will create one and then return it.
	 */
	public static getLogger(name: string): Logger {
		let logger: Logger;
		this.loggers.forEach((l) => {
			if (l.name === name) {
				logger = l;
			}
		});

		if (!logger) {
			logger = LoggerFactory.createLogger(name);
			LoggerFactory.loggers.push(logger);
		}
		return logger;
	}

	/**
	 * @public
	 * @static
	 * @type {Function}
	 * @param {String} name
	 * @return {Logger}
	 *
	 * @description
	 * This will create a logger and assign it's name to 
	 * the name parameter passed and create functions to write
	 * logs at different log levels.
	 */
	private static createLogger(name: string): Logger {
		return {
			name: name,
			info: ((out?: string) => {
				writeOut('INFO', name, out);
			}),
			debug: ((out?: string) => {
				if (LoggerFactory.isDebugEnabled()) {
					writeOut('DEBUG', name, out);
				}
			}),
			warn: ((out?: string) => {
				writeOut('WARN', name, out);
			}),
			error: ((out?: string) => {
				writeOut('ERROR', name, out);
			})
		};
	}
}

/**
 * @name writeOut
 * @private
 * @param {String} level - The log level
 * @param {String} name - The logger name
 * @param {String} out - The log statement
 * @type {Function}
 *
 * @description
 * This function is triggered by all other logger writing functions.
 * The log statement will be created with a timestamp, the name of the logger, as well as the
 * log level provided. Once the statement is created, it is then sent via ajax to the server
 * so the log files can be populated.
 */
function writeOut(level: string, name: string, out?: string): void {
	if (!LoggerFactory.isDisabled()) {
		let now = new Date();
		let logMsg = now.toLocaleString().replace(',', '')+' ::'+level+':: '+name+' - '+out;
		//TODO: use jquery and ajax to POST to api log url.
	}
}