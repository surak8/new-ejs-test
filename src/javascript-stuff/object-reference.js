// https://www.w3schools.com/js/js_object_es5.asp

var object,property,descriptor,descriptors; // rik edits

// extracted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
property="property1"; // rik
descriptor={ // rik
	value: 42,
	writable: false
};
// extracted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
descriptors={
	property2: {
		value: 42,
		writable: true
	},
	property3: {}
};
//Object.defineProperty(object1, 'property1', {
//  value: 42,
//  writable: false
//});

// Create object with an existing object as prototype
//object=Object.create(); // does not work
object=Object.create({});

// Adding or changing an object property
Object.defineProperty(object, property, descriptor);

// Adding or changing object properties
Object.defineProperties(object, descriptors);

// Accessing Properties
// eslint-disable-next-line no-unused-vars
var hasProp0=Object.getOwnPropertyDescriptor(object, property);

// Returns all properties as an array
// eslint-disable-next-line no-unused-vars
var hasProp1=Object.getOwnPropertyNames(object);

// Accessing the prototype
// eslint-disable-next-line no-unused-vars
var hasProto=Object.getPrototypeOf(object);

// Returns enumerable properties as an array
// eslint-disable-next-line no-unused-vars
var keys=Object.keys(object);

console.log("done");