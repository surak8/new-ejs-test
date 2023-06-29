// interable-example.js
// https://www.w3schools.com/js/js_object_iterables.asp

var myNumbers,done;
// Create an Object
myNumbers = {};

// Make it Iterable
myNumbers[Symbol.iterator] = function() {
	let n = 0;
	done = false;
	return {
		next() {
			n += 10;
			if (n == 100) {done = true;}
			return {value:n, done:done};
		}
	};
};

for (const num of myNumbers) {
	// Any Code Here
	console.log(`num=${num}`);
}