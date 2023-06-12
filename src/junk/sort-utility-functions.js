"use strict";
const fs = require("fs");
const json5 = require("json5");

function sortedProperties(anObj) {
	var newObj, keys;

	if (!anObj) return {};
	newObj = {};
	keys = Object.keys(anObj).sort();
	keys.forEach((akey) => newObj[akey] = anObj[akey]);
	return newObj;
}

function sortFile(afile) {
	var anObj, fopts = { encoding: "utf-8" }, output, newObj;

	if (afile && fs.existsSync(afile)) {
		anObj = json5.parse(fs.readFileSync(afile, fopts));
		newObj = sortedProperties(anObj);
		output = json5.stringify(newObj, { space: "\t", quote: "\"" });
		console.log(`result=${output}`);
	}
}

exports.sortFiles = function sortFiles(files) {
	var filesToProcess;

	if (files) {
		if (typeof (files) === "string")
			filesToProcess = [files];
		else if (typeof (files) === "object") {
			if (Array.isArray(files))
				filesToProcess = files;
		}
		if (filesToProcess)
			filesToProcess.forEach((afile) => sortFile(afile));
		else
			console.warn("file-vector is empty");
	} else
		console.warn("no files to process");

};
