class EnvResolver {
	constructor(args){
		this.args=args;
	}

	process(){
		const REGEX=/\${ENV:([A-z0-9_]*)}/g;
		var ret=[],nchanges=0;

		if (args&&typeof(args)==="object"&&Array.isArray(args)){
			args.forEach(anArg=>{
				if (typeof(anArg)==="string"){
					result=anArg;
					for (let value of anArg.matchAll(REGEX))
						if (value.length>1){
							result=result.replace(value[0],process.env[value[1]]);
							nchanges++;
						}

					ret.push(nchanges<1?anArg:result);
				}else
					console.log("not found?");
			});
		}
		return ret;
	}
	//function init(args){
	//	console.log("here");
	//	this.args=args;
	//	return this;
	//}
}

//var args=process.argv.slice(2),result;
var result="";

function processArgs(args){
	const REGEX=/\${ENV:([A-z0-9_]*)}/g;
	var ret=[],nchanges=0;

	if (args&&typeof(args)==="object"&&Array.isArray(args)){
		args.forEach(anArg=>{
			if (typeof(anArg)==="string"){
				result=anArg;
				for (let value of anArg.matchAll(REGEX))
					if (value.length>1){
						result=result.replace(value[0],process.env[value[1]]);
						nchanges++;
					}

				ret.push(nchanges<1?anArg:result);
			}else
				console.log("not found?");
		});
	}
	return ret;

}

var args=process.argv.slice(2);
var zzz=new EnvResolver(args)
	.process();

console.debug("test");

var blah=processArgs(args);
console.debug(JSON.stringify(blah,null,"\t"));
