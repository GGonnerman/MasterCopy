class Person { // This is an object

	constructor(firstname, lastname) {
		this.firstname = firstname;
		this.lastname = lastname;
	}

	greet() {
		return "Hi " + this.firstname;
	}

}

let john = new Person("John", "Doe"); // Pretty much object.create(person)

console.log(john.greet());

// "Syntactic sugar" doesnt change how it works, just adds easier syntax
class InformalPerson extends Person { // extends sets the prototype

	constructor(firstname, lastname) {
		super(firstname, lastname);
	}

	greet() { // Overrides/Hides the function on the prototype
		return "Yo " + this.firstname;
	}

}

let jonny = new InformalPerson("Jonny", "Doey");

console.log(jonny.greet());
