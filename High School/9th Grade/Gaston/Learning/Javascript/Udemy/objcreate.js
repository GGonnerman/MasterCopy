let person = {
	firstname: "Default",
	lastname: "Default",
	greet() {
		return "Hi " + this.firstname;
	}
}

let john = Object.create(person);

john.firstname = "John";
john.lastname = "Doe";

console.log(john.greet());

class Person {
	constructor({firstname, lastname}={}) {
		this.firstname = firstname || "Default";
		this.lastname = lastname || "Default";
	}

	greet() {
		console.log("Hello " + this.firstname + " " + this.lastname);
	}
}

let jane = {
	firstname: "Jane",
	lastname: "Doe"
}
jane = new Person(jane);
jane.greet();

let pam = new Person({lastname: "Jammy", firstname: "Pam"});
pam.greet();
