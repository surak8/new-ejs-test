"use strict";

// #region required packages
const fs=require("fs");
const path=require("path");
const {SAVE_EXTENSION, EXTENSION} =require("./jsonConstants");
// #endregion required packages

/**
 * file description of this file.
* @author rik cousens <rcousens@colt.com>
 */

/**
* Find JSON files, recursively
* @class
* @property {Array} args - some args
*/
const JSONFileFinder={
// #region properties
	/**
* @property {Array} args - some args-2
*/
	get jsonFilesOrPaths(){return this._filesOrPaths;},
// #endregion properties

// #region functions

	/**
	* Find all JSON files in specified in init() or
	* recursively found in folders, if any were specified.
	* @returns an {Array} of JSON files, if any
	*/
	findFiles:function(){
		var astat,thisFile, ret=[],myArgs=this.jsonFilesOrPaths;

		if (myArgs)
			if (typeof(myArgs)==="object"&&Array.isArray(myArgs)){
				// examine each arg for file vs directory.
				myArgs.forEach((anArg)=>{
					astat=fs.statSync(thisFile=path.resolve(anArg));
					if (astat.isFile())
						ret.push(thisFile);
					else if (astat.isDirectory())
						ret.push(...this.readDirContents(thisFile));
				});
			}
		return ret;
	},

	/**
	 * Search for JSON files in the specifieed subdirectories.
	 * @param {string} adir base directory
	 * @param {Array} folders folders within this directory to search
	 * @returns an {Array} of JSON files found, recursively
	 */
	findFilesInSubfolders:function(adir,folders){
		var ret=[];

		if (adir&&folders)
			folders.forEach((afolder)=>
				ret.push(...this.readDirContents(path.join(adir,afolder.name)))
			);
		return ret;
	},

	/**
	* Prepare this instance for finding JSON files.
	* @param {Array} filesOrDirs files / directories to process.
	* @returns this.
	*/
	init:function(filesOrDirs){ this._filesOrPaths=filesOrDirs; return this;},

	/**
* Find JSON files within the specified folder.
* @param {string} searchDir the directory to process
* @returns an {Array} of JSON files, if any.
*/
	readDirContents:function(searchDir){
		var ret=[],files2;

		if (searchDir&&fs.existsSync(searchDir)){
			// collect entries in this directory.
			files2=fs.readdirSync(searchDir,{withFileTypes:true,recursive:true});

			// find files in all subfolders of this directory
			ret.push(...this.findFilesInSubfolders(
				searchDir,
				files2.filter((aDirEnt)=>aDirEnt.isDirectory())));

			// find all files in this directory.
			files2
				.filter((aDirEnt)=>this.isJSONFile(aDirEnt))
				.forEach((afile)=>ret.push(path.join(searchDir,afile.name)));
		}
		return ret;
	},
	/**
	 * Determine if the given filename should be something that we process.
	 * @param {string} filename name of the file to evaluate
	 * @returns a {boolean} values of <b>true</b> if we want it.
	 */
	isValidJSONFile:function(filename){
		var ext,basename;

		if (filename){
			if ((ext=path.extname(filename))===EXTENSION){
				basename=path.basename(filename,ext);
				if (path.extname(basename)===SAVE_EXTENSION)
					return false; // it's already a backup filename
				return true;
			}
		}
		return false;
	},
	/**
	 * Determine if the given filename should be something that we process.
	 * @param {string} filename name of the file to evaluate
	 * @returns a {boolean} values of <b>true</b> if we want it.
	 */
	isJSONFile:function(aDirEnt){
		if (aDirEnt) return aDirEnt.isFile()&&this.isValidJSONFile(aDirEnt.name);
		return false;
	}
	// #endregion functions
};

module.exports={
	JSONFileFinder
};