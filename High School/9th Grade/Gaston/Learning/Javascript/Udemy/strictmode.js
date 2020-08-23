"use strict"; // strict globally 

function logNewPerson() {
	"use strict"; // only strict in this execution context

	let person2;
	persom2 = {}; // error with strict, fine without
	console.log(persom2);
}

logNewPerson();
