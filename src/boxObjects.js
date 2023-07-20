/*
* create boxes around an array of objects.
*/

class BoxObjectUtil {

	constructor(args) {
		this._args = args;
		this._replacementChar = ".";
		this._replacementChar = " ";
	}
	get replacementChar() { return this._replacementChar; }
	generate(arr) {
		var amap;

		function generateMapEntryForItem(retMap, anItem) {
			var thisLen;

			if (retMap && anItem)
				for (const [key, value] of Object.entries(anItem)) {
					thisLen = value.length;
					if (!retMap.has(key)) retMap.set(key, { maxWidth: thisLen });
					else if (retMap.get(key).maxWidth < thisLen) retMap.get(key).maxWidth = thisLen;
				}
		}

		function pad(data, repChar, width = 2) {
			var vdata;

			if (data) {
				vdata = data.toString();
				if (vdata.length > width)
					return vdata.substring(0, width);
				return vdata + repChar.repeat(width - vdata.length);
			}
			return "X";
		}

		function mapit(arr) {
			var retMap;

			if (arr && typeof (arr) === "object" && Array.isArray(arr)) {
				retMap = new Map();
				arr.forEach(anItem => generateMapEntryForItem(retMap, anItem));
				return retMap;
			}
		}

		function generateText(amap, arr, repChar) {
			var ret = [], ncols, maxWidth = 0, stars, line;

			if (arr && amap) {
				ncols = amap.size;

				for (const [key, value] of amap.entries())
					maxWidth += value.maxWidth;

				maxWidth += 4; // left and right margins
				maxWidth += ((ncols - 1) * 3); // number of dividers (internal column separators)
				stars = "*".repeat(maxWidth);
				ret.push(stars);

				var data, fmt;
				arr.forEach(arow => {
					line = ("* ");
					// iterate through map-entries, and extracting data from each row
					var index = 0;
					for (const [key, value] of amap.entries()) {
						data = arow[key];
						if (index > 0) line += " * ";
						fmt = pad(data, repChar, value.maxWidth);
						line += `${fmt}`;
						index++;
					}
					line += " *";
					ret.push(line);
				});
				ret.push(stars);
			}
			return ret.join("\r\n");
		}

		if (arr)
			return generateText(mapit(arr), arr, this.replacementChar);
		return "";
	}
}

try {
	var b = new BoxObjectUtil({ debug: true });
	var disp = b.generate([
		{ c1: "Column1", c2: "Column2", c3: "Column 3" },
		{ c1: "v1", c2: "v2" },
		{ c1: "v1111", c2: "v2" },
		{ c1: "v22222", c2: "v2" },
	]);
	console.debug(disp);
} catch (anException) {
	console.error(anException);
}
