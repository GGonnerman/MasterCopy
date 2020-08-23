let person = {
	firstname: "John",
	lastname: "Doe",
	getFullName: function() {
		let fullname = this.firstname + " " + this.lastname;
		return fullname;
	}
}

let logName = function(lang1, lang2) {

	console.log("Logged: " + this.getFullName());
	console.log("Arguments: " + lang1 + " " + lang2);
	console.log("----------------------------");

}

let logPersonName = logName.bind(person);

logPersonName("en");

logName.call(person, "en", "es");

logName.apply(person, ["en", "es"]);

(function(lang1, lang2) {
	console.log("Logged: " + this.getFullName());
	console.log("Arguments: " + lang1 + " " + lang2)
	console.log("----------------------------------");

}).apply(person, ["es", "jp"]);



let person2 = {
	firstname: "Jane",
	lastname: "Doe"
}

console.log(person.getFullName.apply(person2));

// Function currying
function multiply(a, b) {
	return a * b;
}

let multiplyByTwo = multiply.bind(this, 2);

console.log(multiplyByTwo(4));





















































