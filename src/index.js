const ejs=require("ejs");
const fs=require("fs");
const path=require("path");

function makeFilename(dir, filename) {
	if (dir && filename) {
		if (!fs.existsSync(dir))
			fs.mkdirSync(dir, { recursive: true });
		return path.resolve(path.join(dir, filename));
	}
	throw new Error("ACK!");
}

function doTransform(template,outFile,logToConsole=false) {
	var data, options;

	if (!template) throw new Error("'template' is null!");
	if (!outFile) throw new Error("'outFile' is null!");
	data={
		className:"riktest",
		connectorNames: ["c1","c2"]
	};

	options = {
		//filename: "fname-cache",
		//compileDebug: true,
		//views: "views",
		//rmWhitespace: true,
		//outputFunctionName: "blah",

		//strict:true,
		//debug:true,
		//with:false,
		//_with: true
		//_with: false

	};
	ejs.renderFile(template, data, options,
		(err, str) => {
			// str => Rendered HTML string
			if (err) console.error("error: " + err);
			else {
				if (logToConsole){
					var stars="*".repeat(80);

					console.log(`${stars}\r\n`+
						"*** RESULT\r\n"+
						`${str}\r\n`+
						`${stars}`);
				}
				//var tmp=str.replace()
				//var tmp=str.replace(/\r\n/g, "\n");

				fs.writeFileSync(outFile, str, { encoding: "utf-8" });
				console.log("wrote: " + outFile);
			}
		});
}

function testTemplate() {
	const BASE_NAME="create-class";
	var template;

	template = makeFilename(
		path.join(process.cwd(), "templates"),
		BASE_NAME+".ejs");
	if (fs.existsSync(template)) doTransform(
		template,
		makeFilename(
			path.join(process.cwd(), "out","ejs-results"),
			BASE_NAME+".js"),
		true
	);
	else console.warn("non-existent template: " + template);
}

// pino@8.14.1 LATEST
// pino@6.10.0
function main() {
	//testLogging();
	//testDateAdd();
	testTemplate();

	console.log("done");
}

try {
	main();
}catch(anexception){
	console.error(anexception);
	process.exitCode=1;
}