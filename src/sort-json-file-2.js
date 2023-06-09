"use strict";
const { JSONFileFinder } = require("./jsonFileFinder");
const { JSONFileSorter } = require("./jsonFileSorter");

/**
 * Find JSON files / directories from the
 * command-line, and rewrite them with their
 * properties sorted alphabetically.
 * @author rik cousens <rcousens@colt.com>
 */
function main(opts = {}) {

	var localOpts;

	if (opts)
		localOpts = opts;

	// eslint-disable-next-line no-unused-vars
	var tmp0 = JSONFileFinder
		.init(process.argv.slice(2));
	var files = tmp0.findFiles();
	if (files && files.length > 0) {
		console.log(`filenames=${JSON.stringify(files, null, "\t")}`);

		// eslint-disable-next-line no-unused-vars
		var tmp2 = JSONFileSorter
			.init(files, { debug: true })
			.sortFiles();
	} else
		console.warn("no files found.");
	console.log("done");
}

try {
	main({ debug: true, verbose: true });
} catch (anException) {
	console.error(anException);
}
