function Person(firstname, lastname) { // Old way to create an objects

	this.firstname = firstname; // Declaring variable in the objects
	this.lastname = lastname;

	this.printName = function() { // Creating method on object
		console.log(this.firstname);
	}
}

Person.prototype.getFullName = function() { // Adding method to the object
	return this.firstname + " " + this.lastname;
}

/*
 * Things like
 * let john = Person("John", "Doe");
 * can occurs, and will not cause errors until you run a method/get value from john
 * fixed in new way to create class
 */

let john = new Person("John", "Doe"); // Creating instance of the Person
console.log(john);
console.log(john.getFullName());

let jane = new Person("Jane", "Doe"); // Creating another instance of the Person
console.log(jane);
console.log(jane.getFullName());

Person.prototype.getFormalFullName = function() { // Adding methods on the fly
	return this.lastname + ", " + this.firstname;
}

console.log(john.getFormalFullName()); // Using methods created on the fly
console.log(jane.getFormalFullName());



class Human { // New way to create classes
	constructor(firstname, lastname) { // constructor for the class
		this.firstname = firstname;
		this.lastname = lastname;
	}

	printName() { // Adding method (functions the same as adding method on the fly in old way 
		console.log(this.firstname);
	}
}

Human.prototype.getFullName = function() { // Adding method on the fly 
	return this.firstname + " " + this.lastname;
}

let j = new Human("John", "Doe"); // Creating instance of object
console.log(j);
console.log(j.getFullName());

let a = new Human("Jane", "Doe"); // Creating another instance of the object
console.log(a);
console.log(a.getFullName());

Human.prototype.getFormalFullName = function() { // Adding methods on the fly
	return this.lastname + ", " + this.firstname;
}

console.log(j.getFormalFullName()); // Using methods added on the fly
console.log(a.getFormalFullName());
