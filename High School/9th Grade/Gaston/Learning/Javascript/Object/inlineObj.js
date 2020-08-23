let privateThing = "anything you want";

let user = { // Create an object
	firstName: "John", // Add properties into the object
	lastName: "Doe",
	age: 20,
	[privateThing]: false,

	printName() { // Add a method into the object
		return this.firstName + " " + this.lastName; // this. because we are talking about this object
	}
}

console.log("User[privateThing]: ", user[privateThing]);

console.log("User.printName(): ", user.printName()); // Print users printname return value
console.log("User: ", user); // console.log everything about the user

console.log("User.firstname: ", user.firstName); // Using dot notation
console.log("User[\"firstname\"]: ", user["firstName"]); // Using bracket notation

user["id"] = Math.floor(Math.random() * 100); // Adding a new property to the object

console.log("User.id: ", user.id);

console.log("User: ", user);

user["printInfo"] = function() { // Adding method on the fly
	return "Name: " + this.firstName + " " + this.lastName + "\nAge: " + this.age + "\nId: " + this.id;
}

console.log("User.printInfo(): ", user.printInfo());

delete user.age; // Removing a property from user

console.log("User: ", user);

console.log("User.printInfo(): ", user.printInfo());
