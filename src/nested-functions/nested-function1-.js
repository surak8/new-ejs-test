// https://www.educba.com/javascript-nested-functions/

function parentFun() {
	function childFun1() {
		function childFun2() {
			//code
		}
		childFun2(); //function calling
	}
	childFun1();//function calling
}
parentFun();//function calling