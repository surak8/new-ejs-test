// array test
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.push("Kiwi", "Lemon", "Pineapple");
const f2=["Pear"];
//fruits.push(["pear"]); // adds the array
fruits.push(...f2);
// eslint-disable-next-line no-unused-vars
const f3=fruits.sort();
console.log("here");