class EnvResolver {
	constructor(args){
		this.args=args;
	}

	process(){
		const REGEX=/\${ENV:([A-z0-9_]*)}/g;
		var ret=[],nchanges=0,result;

		if (this.args&&typeof(this.args)==="object"&&Array.isArray(this.args)){
			this.args.forEach(anArg=>{
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

module.exports={
	EnvResolver
};