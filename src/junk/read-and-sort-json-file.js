const path=require("path");
const fs=require("fs");
const json5=require("json5");

const {DEBUG_PROP_NAME,SAVE_EXTENSION}=require("./");
//const

//const DEBUG_PROP_NAME="debug";
//const BACKUP_EXTENSION="debug";

class BackupUtil{
	//static get backupExtension(){return BACKUP_EXTENSION;}
	constructor(opts={}){
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
		console.debug(`${DEBUG_PROP_NAME}=${this[DEBUG_PROP_NAME]}`);
	}

	get debug(){return this._debug;}

	backupFilename(filename) {
		var ext;

		if (filename){
			ext=path.extname(filename);
			return path.join(
				path.dirname(filename),
				path.basename(filename,ext)+SAVE_EXTENSION+ext );
		}
	}

	hasPropertyNamed(anObj,propertyName){
		if (anObj&&propertyName)
			return Object.keys(anObj).filter((propertyName)=>propertyName==="debug").length>0;
		return false;
	}

	backupFile(filename){
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
	}
	//}

	readAndSortSingle(filename){
		var content,fopts={encoding:"utf-8"};

		console.log(`filename=${filename}`);
		if (filename&&fs.existsSync(filename)){
			content=json5.parse(fs.readFileSync(filename,fopts));
			if (content){
				this.backupFile(filename);
				fs.writeFileSync(filename,json5.stringify(content, {space:"\t",quote:"\""}), fopts );
			}
		}
	}
}

function readAndSort(filenames,opts={}){
	var instance;

	if (filenames){
		instance=new BackupUtil(opts);
		if (typeof(filenames)==="string") instance.readAndSortSingle(filenames);
		else if (typeof(filenames)==="object"&&Array.isArray(filenames))
			filenames.forEach((afilename)=>instance.readAndSortSingle(afilename));
	}
}

try {
	readAndSort(
		[
			path.resolve(path.join(process.cwd(),".vscode","settings.json")),
			path.resolve(path.join(process.cwd(),"test1.json")),
			path.resolve(path.join(process.cwd(),"test2.json")),
		],{debug:false}	);
}catch(anException){
	console.log(anException);
}