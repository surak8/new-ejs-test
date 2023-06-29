// object-custom-tostring.js
class Dog {
	constructor(name, breed, color, sex) {
		this.name = name;
		this.breed = breed;
		this.color = color;
		this.sex = sex;
	}
}

/************************* */
const theDog = new Dog("Gabby", "Lab", "chocolate", "female");

var v1=theDog.toString(); // "[object Object]"
var v2=`${theDog}`; // "[object Object]"

/************************ */