// #region required packages
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const pino = require("pino");
// #endregion required packages

// #region logger class
/**
 * logging class
 */
class MyLogger {
	// #region ctor
	/**
	 * constructor.
	 * @param {object} args ctor-args
	 */
	constructor(args) {
		this._args = args;
		if (args)
			if (typeof (args) === "string")
				this._logfilename = args;
		this.openLogFile();
	}
	// #endregion ctor

	// #region properties
	get logFileName() { return this._logfilename; }
	get writable() { return true; }
	// #endregion properties

	// #region class functions

	openLogFile() {
		if (this.logFileName)
			this._writeStream = fs.createWriteStream(this.logFileName, { flags: "a", rik_test: true });
	}

	write(msg) {
		if (this._writeStream)
			this._writeStream.write(msg);
		else
			console.log("here");
	}
	// #endregion class functions
}
// #endregion logger class

function testDateAdd(alogger, numberOfDaysToAdd) {
	var someDate = new Date();

	var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

	if (alogger) console.log("zzz");
	console.log(new Date(result));
}

function testLogging() {
	var logger;

	logger = new pino(new MyLogger("mylogger.log"));
	testLogger(logger);
	testDateAdd(logger, 6);
	testLogger(logger);
}

// #region local functions
function testLogger(alogger) {
	alogger.fatal("fatal");
	alogger.error("error");
	alogger.warn("warn");
	alogger.info("info");
	alogger.debug("debug");
	alogger.trace("trace");
}

function makeFilename(dir, filename) {
	if (dir && filename) {
		if (!fs.existsSync(dir))
			fs.mkdirSync(dir, { recursive: true });
		return path.resolve(path.join(dir, filename));
	}
	throw new Error("ACK!");
}

function doTransform(template) {
	var data, options;

	data = {
		user: { name: "riktest-0" },
		users: [
			{ name: "riktest-1" },
			{ name: "riktest-2" },
			{ name: "riktest-3" },
			{ name: "riktest-4" },
		]
	};
	options = {
		filename: "fname-cache",
		compileDebug: true,
		//strict:true,
		views: "views",
		rmWhitespace: true,
		outputFunctionName: "blah",
		//debug:true,
		//with:false,
		_with: true

	};
	const FILENAME = "result.htm";
	ejs.renderFile(template, data, options,
		(err, str) => {
			// str => Rendered HTML string
			if (err) console.error("error: " + err);
			else {
				fs.writeFileSync(FILENAME, str, { encoding: "utf-8" });
				console.log("wrote: " + FILENAME);
			}
		});
}

function testTemplate() {
	var template;

	template = makeFilename(path.join(process.cwd(), "templates"), "test.ejs");
	if (fs.existsSync(template)) doTransform();
	else console.warn("non-existent template: " + template);
}
// #endregion local functions

// pino@8.14.1 LATEST
// pino@6.10.0
function main() {
	testLogging();
	//testDateAdd();
	//testTemplate();

	console.log("done");
}

main();
