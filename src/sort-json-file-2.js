"use strict";
const {JSONFileFinder}=require("./jsonFileFinder");
const {JSONFileSorter}=require("./jsonFileSorter");

/**
 * Find JSON files / directories from the
 * command-line, and rewrite them with their
 * properties sorted alphabetically.
 * @author rik cousens <rcousens@colt.com>
 */
function main(){
// eslint-disable-next-line no-unused-vars
	var tmp0=JSONFileFinder
		.init(process.argv.slice(2));
	var files=tmp0.findFiles();
	console.log(`filenames=${JSON.stringify(files,null,"\t")}`);

	// eslint-disable-next-line no-unused-vars
	var tmp2=JSONFileSorter
		.init(files,{debug:true})
		.sortFiles();
	console.log("done");
}

try {
	main();
}catch(anException){
	console.error(anException);
}