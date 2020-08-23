let carYard = {
	carList: [], // array of car objects
	idList: [], // array of car ids

	addCar(car, id) { // Add a car to the car yard
		this.carList.push(car);
		this.idList.push(id);
	},

	buyCar(id) { // buy a car using it's id
		if (carYard.idList.includes(id)) {
			let index = this.idList.indexOf(id);
			console.log("You purchased " + this.carList[index].type + "\n", this.carList[index]);
			this.carList.splice(index, 1);
			this.idList.splice(index, 1);
		} else {
			console.log("We do not have a car by the id " + id);
		}
		console.log("");
	},

	listCars() { // list of cars in the caryard
		console.log("Cars in stock");
		for(let i = 0; i < this.idList.length; i++) {
			console.log("Id: " + this.idList[i] + "\n", this.carList[i]);
		}
		console.log("");
	}
}


class Car {
	constructor(type, age, sellerName) {
		this.type = type;
		this.age = age;
		this.seller = sellerName;
		let id = (Math.floor(Math.random() * 900000 + 100000)).toString();
		this.id = id.substr(0, 3) + "-" + id.substr(3);

		carYard.addCar(this, this.id); // add this car to the caryard
	}
}
// create some new cars
let golfCart = new Car("Cart", 8, "John");

let koenigseggCC = new Car("koenigseggCC", 22, "Jane");

let speedy = new Car("Fast", 1, "Phil");

carYard.listCars();
// buy a real car
carYard.buyCar(golfCart.id);
// attempt to by a fake car
carYard.buyCar("123-456");

carYard.listCars();
