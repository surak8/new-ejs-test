"use strict";
const fs=require("fs");
const path=require("path");
const json5=require("json5");

const { DEBUG_PROP_NAME,SAVE_EXTENSION,VERBOSE_PROP_NAME}=require("./jsonConstants");
/**
 * Sort fields in a JSON file.
 * @class
 * @property {Array} args - processing arguments
 * @property {boolean} debug - is debugging enabled.
 * @property {boolean} verbose - perform verbose processing.
 */
const JSONFileSorter={
/**
 * Calculate the name of a backup file.
 * @param {string} filename name of the file to duplicate.
 * @returns a {string} containing the calculated backup-file-name, or <b>undefined</b>.
 */
	backupFilename:function(filename) {
		var ext;

		if (filename){
			ext=path.extname(filename);
			return path.join(
				path.dirname(filename),
				path.basename(filename,ext)+SAVE_EXTENSION+ext );
		}
	},

	/**
 * Create a backup of the given <b><i>filename</i></b>.
 * @param {string} filename the file to duplicate
 */
	backupFile: function(filename){
		var bkpName;

		if (filename&&fs.existsSync(filename)) {
			fs.copyFile(
				filename,
				bkpName=this.backupFilename(filename),
				(err) => {
					if (err) {
						console.log("Error Found:", err);
					} else {
						if (this.debug)
							console.log(
								`backed up ${path.basename(filename)} to ${path.basename(bkpName)}`);
					}
				});
		}
	},

	/**
 * Generate a new object with it's properties sorted by name.
 * @param {Object} anObj an object from which to extract and sort properties.
 * @returns an {Object} with sorted fields (by name).
 */
	createObjectWithSortedProperties:function(anObj){
		var newObj,keys;

		if (this.verbose) console.log(`${this.createObjectWithSortedProperties.name}`);
		if (!anObj) return {};
		newObj={};
		keys=Object.keys(anObj).sort();
		keys.forEach((akey)=>newObj[akey]=anObj[akey]);
		return newObj;
	},

	/**
* Determine whether the give object contains a specific property.
* @param {Object} anObj an object to search
* @param {string} propertyName name of the property to find
* @returns a <b>boolean</b> value of <b><i>true</i></b> if the property is found, <b><i>false</i></b> otherwise.
*/
	hasPropertyNamed:function(anObj,propertyName){
		if (this.verbose) console.log(`${this.hasPropertyNamed.name}`);
		if (anObj&&propertyName)
			return Object.keys(anObj).filter((objPropertyName)=>objPropertyName===propertyName).length>0;
		return false;
	},
	/**
 * Initialize this instance.
 * @param {Array} args collection of tiles to write.
 * @param {Object} opts processing options.
 * @returns this
 */
	init:function(args,opts={}){
		if (this.debug) console.log(`${this.init.name}`);
		this._args=args;
		this.parseOpts(opts);
		return this;
	},
	/**
 * Extract processing arguments.
 * @param {object} opts processing options
 */
	parseOpts:function(opts){

		this.setBoolProperty(opts,DEBUG_PROP_NAME);
		this.setBoolProperty(opts,VERBOSE_PROP_NAME);

		if (this.verbose) console.log(`${this.parseOpts.name}`);

	},
	/**
 * Rewrite file-collection.
 * @param {string} or {Array} fileList filename, or vector of files to rewrite.
 * @returns this.
 */
	rewriteJSONFiles:function(fileList){
		if (this.verbose) console.log(`${this.rewriteJSONFiles.name}`);
		if (fileList&&typeof(fileList)==="object"&&Array.isArray(fileList))
			fileList.forEach((afile)=>this.rewriteJSONObjectByPropertyName(afile));
		return this;
	},
	/**
 * Open a JSON file, sort it's properties, and write it back to disk.
 * @param {string} afile filename to open and rewrite.
 */
	rewriteJSONObjectByPropertyName:function(afile){
		var anObj,newObj,output,fopts={encoding:"utf-8"},content;

		if (this.verbose) console.log(`${this.rewriteJSONObjectByPropertyName.name}`);
		if (afile&&fs.existsSync(afile)){
			this.backupFile(afile);
			content=fs.readFileSync(afile,fopts);
			if (content&&content.length>0){
				anObj=json5.parse(content);
				newObj=this.createObjectWithSortedProperties(anObj);
				output=json5.stringify(newObj, {space:"\t",quote:"\""});
				fs.writeFileSync(afile,output,fopts);
				console.log(`rewrote ${path.resolve(afile)}`);
			}else
				console.log(`empty file: ${path.resolve(afile)}`);
		}
	},
	setBoolProperty:function(opts,propertyName){
		var propValue,propType,needAdd=true;

		if (opts&&propertyName){

			if (this.hasPropertyNamed(opts,propertyName)) {
			// convert it to boolean, if required
				propValue=opts[propertyName];
				if (propValue){
					needAdd=false;
					if ((propType=typeof(propValue))!=="boolean"){
						if (propType==="string") opts[propertyName]=(propValue==="true"||propValue==="yes"||propValue==="on"||propValue==="1");
						else if (propType==="number") opts[propertyName]=Number.isSafeInteger(propValue)&& Number(propValue)>0;
						else console.warn(`property '${propertyName}' has unhandled type: ${propType}`);
					}
				}
			}
			if (needAdd)opts[propertyName]=false;
			this["_"+propertyName]=opts[propertyName];
		}
	},

	/**
* Iterate through <b>args</b> and rewrite any JSON files.
* @returns this
*/
	sortFiles:function(){
		var objType;

		if (this.verbose) console.log(`${this.sortFiles.name}`);
		if (this.args)
			if ((objType=typeof(this.args))==="object")
				if (Array.isArray(this.args)) this.rewriteJSONFiles(this.args);
				else console.warn("not array!");
			else if (objType==="string") this.rewriteJSONFiles([this.args]);
			else console.log("not object here");
		else
			console.log("args==null");
		return this;
	},

	/**
* Processing arguments
* @property {Array} collection of processing arguments.
*/
	get args(){return this._args;},
	/**
* Enabled debugging.
* @property {boolean} is debugging enabled.
*/
	get debug(){return this._debug;},
	/**
* Enabled verbose processing.
* @property {boolean} if we're verbosely processing.
*/
	get verbose(){return this._verbose;}
};

module.exports={
	JSONFileSorter
};