class Car { // Creating a class
	constructor(type, age, ownerName) { // when the class is made, what happens to it
		this.type = type; // giving object the params passed
		this.age = age;
		this.ownerName = ownerName;
		let id = (Math.floor(Math.random() * 900000 + 100000)).toString();
		this.id = id.substr(0, 3) + "-" +  id.substr(3);
	}

	printInfo() { // adding a method to the car
		return "Type: " + this.type + "\nAge: " + this.age + "\nOwner: " + this.ownerName;
	}
}

let golfCart = new Car("Cart", 8, "John"); // creating a new car named golf cart

console.log(golfCart); // Printing info about the goldcart
console.log(golfCart.printInfo());
console.log(golfCart.ownerName);

golfCart.hasBeenInCrash = true; // adding parameter
console.log(golfCart.hasBeenInCrash);

golfCart.playGolf = function() { // adding method on the fly
	console.log("Golf");
	console.log("Golf.");
	console.log("Golf..");
	console.log("Golf...");
	console.log("Golfed");
}

golfCart.playGolf();

let koenigseggCC = new Car("koenigseggCC", 22, "Jane"); // creating a new car
console.log(koenigseggCC);

class SportsCar extends Car {
	constructor(type, age, ownerName) {
		super(type, age, ownerName);
	}

	goFast() {
		console.log("Vroom Vroom");
	}
}

let speedy = new SportsCar("Fast", 1, "Phil");

console.log(speedy);
speedy.goFast();
