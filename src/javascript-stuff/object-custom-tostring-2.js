// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString

// object-custom-tostring-2.js
class Dog {
	constructor(name, breed, color, sex) {
		this.name = name;
		this.breed = breed;
		this.color = color;
		this.sex = sex;
	}
	toString() {
		return `Dog ${this.name} is a ${this.sex} ${this.color} ${this.breed}`;
	}
}
/********************************* */
const theDog = new Dog("Gabby", "Lab", "chocolate", "female");

var v1=`${theDog}`; // "Dog Gabby is a female chocolate Lab"
console.log("here");