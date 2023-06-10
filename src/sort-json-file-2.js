"use strict";
const fs=require("fs");
const path=require("path");
const json5=require("json5");
const DEBUG_PROP_NAME="debug";

const jsonFileSorter={
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
				path.basename(filename,ext)+".save"+ext );
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
								"backed up\r\n"+
								`\t${filename}\r\n`+
								"to\r\n"+
								`\t${bkpName}`);
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

		if (this.debug) console.log(`${this.createObjectWithSortedProperties.name}`);
		if (!anObj) return {};
		newObj={};
		keys=Object.keys(anObj).sort();
		keys.forEach((akey)=>newObj[akey]=anObj[akey]);
		return newObj;
	},

	/**
	 * Open a JSON file, sort it's properties, and write it back to disk.
	 * @param {string} afile filename to open and rewrite.
	 */
	rewriteJSONObjectByPropertyName:function(afile){
		var anObj,newObj,output,fopts={encoding:"utf-8"};

		if (this.debug) console.log(`${this.rewriteJSONObjectByPropertyName.name}`);
		if (afile&&fs.existsSync(afile)){
			this.backupFile(afile);
			anObj=json5.parse(fs.readFileSync(afile,fopts));
			newObj=this.createObjectWithSortedProperties(anObj);
			output=json5.stringify(newObj, {space:"\t",quote:"\""});
			fs.writeFileSync(afile,output,fopts);
			console.log(`rewrote ${path.resolve(afile)}`);
		}
	},
	/**
	 * Rewrite file-collection.
	 * @param {string} or {Array} fileList filename, or vector of files to rewrite.
	 * @returns this.
	 */
	rewriteJSONFiles:function(fileList){
		if (this.debug) console.log(`${this.rewriteJSONFiles.name}`);
		if (fileList&&typeof(fileList)==="object"&&Array.isArray(fileList))
			fileList.forEach((afile)=>this.rewriteJSONObjectByPropertyName(afile));
		return this;
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
	parseOpts:function(opts){
		var propValue,propType;

		if (this.hasPropertyNamed(opts,DEBUG_PROP_NAME)) {
			// convert it to boolean, if required
			propValue=opts[DEBUG_PROP_NAME];
			if ((propType=typeof(propValue))!=="boolean"){
				if (propType==="string") opts[DEBUG_PROP_NAME]=(propValue==="true"||propValue==="yes"||propValue==="on"||propValue==="1");
				else if (propType==="number") opts[DEBUG_PROP_NAME]=Number.isSafeInteger(propValue)&& Number(propValue)>0;
				else console.warn(`property '${DEBUG_PROP_NAME}' has unhandled type: ${propType}`);
			}
		}else {
			opts[DEBUG_PROP_NAME]=false;
		}
		this._debug=opts[DEBUG_PROP_NAME];
		if (this.debug)
			console.debug(`${DEBUG_PROP_NAME}=${this[DEBUG_PROP_NAME]}`);

		if (this.debug) console.log(`${this.parseOpts.name}`);

	},
	hasPropertyNamed:function(anObj,propertyName){
		if (this.debug) console.log(`${this.hasPropertyNamed.name}`);
		if (anObj&&propertyName)
			return Object.keys(anObj).filter((propertyName)=>propertyName==="debug").length>0;
		return false;
	},

	doit:function(){
		var tmp,opts,propType,propValue;

		if (this.debug) console.log(`${this.doit.name}`);
		//tmp=this.args[]
		if (this.hasPropertyNamed(this.args,DEBUG_PROP_NAME)) {
			// convert it to boolean, if required
			propValue=opts[DEBUG_PROP_NAME];
			if ((propType=typeof(propValue))!=="boolean"){
				if (propType==="string") opts[DEBUG_PROP_NAME]=(propValue==="true"||propValue==="yes"||propValue==="on"||propValue==="1");
				else if (propType==="number") opts[DEBUG_PROP_NAME]=Number.isSafeInteger(propValue)&& Number(propValue)>0;
				else console.warn(`property '${DEBUG_PROP_NAME}' has unhandled type: ${propType}`);
			}
		}else {
			//opts[DEBUG_PROP_NAME]=false;
			this._debug=false;
		}

		this._debug=opts[DEBUG_PROP_NAME];
		console.debug(`${DEBUG_PROP_NAME}=${this[DEBUG_PROP_NAME]}`);
		return this;
	},
	sortFiles:function(){
		var objType;

		if (this.debug) console.log(`${this.sortFiles.name}`);
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
	get args(){return this._args;},
	get debug(){return this._debug;}
};

//var tmp=fileSorterJSON
//	.init(["test1.json",".vscode/settings.json"])
//	.sortFiles();

// eslint-disable-next-line no-unused-vars
var tmp2=jsonFileSorter
	.init("test1.json",{debug:false})
	.sortFiles();
console.log("done");

//sortFiles();
//sortFiles(["test1.json",".vscode/settings.json"]);
//sortFile(path.resolve(path.join(process.cwd(),"test1.json")));
