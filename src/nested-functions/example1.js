function parent(){
//code
	function child() {
		//code
	}
	child();
}
parent();

/**************************************** */
// eslint-disable-next-line no-unused-vars
function triangleHypotenuse(base,height) {
	function square(side){
		return side*side;
	}
	return Math.sqrt(square(base)+square(height));
}