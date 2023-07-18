const {EnvResolver}=require("./envResolver");

var args=process.argv.slice(2);
var zzz=new EnvResolver(args)
	.process();

console.debug("test");
