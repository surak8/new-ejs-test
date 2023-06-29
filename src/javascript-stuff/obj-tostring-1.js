// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
//

// object.tostring.js
function Dog(name) {
	this.name = name;
}

const dog1 = new Dog("Gabby");

Dog.prototype.toString = function dogToString() {
	return `${this.name}`;
};

console.log(dog1.toString());
// Expected output: "Gabby"