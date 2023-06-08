//const { FILE } = require("dns");
const ejs=require("ejs");
const fs=require("fs");
const path=require("path");
const pino=require("pino");
const sb=require("sonic-boom");

class MyLogger{
	constructor(args){
		this._args=args;
		if (args)
			if (typeof(args)==="string")
				this._logfilename=args;
		this.openLogFile();
	}

	openLogFile(){
		if (this.logFileName)
			this._writeStream=fs.createWriteStream(this.logFileName,{flags:"a",rik_test:true});
	}

	get logFileName(){return this._logfilename;}
	get writable(){ return true;}

	write(msg){
		if (this._writeStream)
			this._writeStream.write(msg);
		else
			console.log("here");
	}
}

// pino@8.14.1 LATEST
// pino@6.10.0
function main(){
	var template,data,dir,options,logger,ml,sbi;

	//ml=new MyLogger("log.log");
	//sbi=new sb({dest:"sonic-boom.log",sync:true});

	//ml=new SonicBoom("sonic-boom.log");
	//logger=new pino(ml,{is_first_arg:true},{is_second_arg:true});

	//logger=new pino(new MyLogger("mylogger.log"));
	logger=new pino(new sb({dest:"sonic-boom.log",sync:true}));

	logger.fatal("fatal");
	logger.error("error");
	logger.warn("warn");
	logger.info("info");
	logger.debug("debug");
	logger.trace("trace");
	//logger.fatal("fatal");
	//logg
	//console.log("here");

	template=path.resolve(path.join(process.cwd(),"templates","test.ejs"));
	if (!fs.existsSync(dir=path.dirname(template))	)
		fs.mkdirSync(dir,{recursive:true});
	if (fs.existsSync(template)){
		data={
			user:{ name:"riktest-0" },
			users:[
				{ name:"riktest-1" },
				{ name:"riktest-2" },
				{ name:"riktest-3" },
				{ name:"riktest-4" },
			]
		};
		options={
			filename:"fname-cache",
			compileDebug:true,
			//strict:true,
			views:"views",
			rmWhitespace:true,
			outputFunctionName:"blah",
			//debug:true,
			//with:false,
			_with:true

		};
		const FILENAME="result.htm";
		ejs.renderFile(template, data, options,
			(err, str)=>{
				// str => Rendered HTML string
				if (err)					console.error("error: "+err);
				else					{
					fs.writeFileSync(FILENAME,str,{encoding:"utf-8"});
					//console.log(str);
					console.log("wrote: "+FILENAME);
				}
			});
	}else
		console.warn("non-existent template: "+template);
	console.log("here");
}

main();
