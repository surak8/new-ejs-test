// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create

var o;

o = {};
// Is equivalent to:
o = Object.create(Object.prototype);

o = Object.create(Object.prototype, {
	// foo is a regular data property
	foo: {
		writable: true,
		configurable: true,
		value: "hello",
	},
	// bar is an accessor property
	bar: {
		configurable: false,
		get() { return 10; },
		set(value) { console.log("Setting `o.bar` to", value); },
	},
});

o.bar=100;

// Create a new object whose prototype is a new, empty
// object and add a single property 'p', with value 42.
o = Object.create({}, { p: { value: 42 } });
console.log("done");
