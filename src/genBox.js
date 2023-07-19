//"use strict";
const DEBUG_VALUE="X";
//const NON_DEBUG_VALUE=".";
const NON_DEBUG_VALUE=" ";

class BoxGenerator{

	constructor(lines,opts){
		this.opts=opts?opts:{debug:false};
		if (!Object.prototype.hasOwnProperty.call(this.opts,"debug"))
			this.opts.debug=false;

		this.lines=lines;
	}
	generate(){
		var lines;
		function calcWidth(anItem,debug=false){
			var tmp,blah,ret;

			ret={text:"",length:0};
			if (anItem&&typeof(anItem)==="string"){
				ret={text:anItem,length:anItem.length};
				if((tmp=[...anItem.matchAll(/\t/g)]).length>0){
					blah=anItem.replace(/\t/g,(debug?DEBUG_VALUE:NON_DEBUG_VALUE).repeat(8));
					ret={text:blah,length:blah.length};
				}
			}
			return ret;
		}

		function findMaxWidth(arr,debug=false){
			var maxLen=0,widthInfo,tmp,newArr,stars;

			if (arr){
				widthInfo=[];

				arr.forEach(anItem=>{
					widthInfo.push(tmp=calcWidth(anItem,debug));
					if (maxLen<tmp.length)
						maxLen=tmp.length;
				});
				 newArr=[ stars="*".repeat(maxLen+4)];
				widthInfo.forEach(
					wi=>
						newArr.push(`* ${wi.text}${(debug?DEBUG_VALUE:NON_DEBUG_VALUE).repeat(maxLen-wi.length)} *`)
				);
				newArr.push(stars);
			}
			return newArr;
		}
		lines= findMaxWidth(this.lines,this.opts?this.opts.debug||false:false);
		return (lines&&lines.length>0)?
			lines.join("\r\n"):
			"";
	}
}

var data=[
	"short message",
	"really really long message here",
	"\tsingle tab",
	"\t\t2 tabs",
];
var bg=new BoxGenerator(data,{debug:false}),disp;

console.debug(disp=bg.generate());
