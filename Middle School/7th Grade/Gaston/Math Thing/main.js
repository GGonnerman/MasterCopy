let numberHolder = document.getElementById("numbers");
let sol = document.getElementById("correctornot");
let attempt = document.getElementById("attempt").value;
if(document.getElementById("remainder") !== null) {
let remainder = document.getElementById("remaining").value || 0;
}

placeNumbers = function (x, y, z) {
	numberHolder.innerHTML = `${x} ${y} ${z}`
}
solve = function (x) {
	sol.innerHTML = ((x) ? "right!" : "wrong");
}
let add = new addition;
let sub = new subtraction;
let mult = new multiply;
let div = new division;

function addition() {
	this.numberOne;
	this.numberTwo;
	this.rightOrWrong;
	this.generate = function () {
		this.numberOne = Math.floor(Math.random() * 49) + 1;
		this.numberTwo = Math.floor(Math.random() * 49) + 1;
		placeNumbers(this.numberOne, "+", this.numberTwo);
	}
	this.verify = function (attempt) {
		this.rightOrWrong = (attempt === this.numberOne + this.numberTwo);
		solve(this.rightOrWrong);
	}
}

function subtraction() {
	this.numberOne;
	this.numberTwo;
	this.generate = function () {
		while (this.numberTwo === undefined || this.numberTwo > this.numberOne) {
			this.numberOne = Math.floor(Math.random() * 29) + 1;
			this.numberTwo = Math.floor(Math.random() * 29) + 1;
		}
	}
	this.verify = function (attempt) {
		this.rightOrWrong = (attempt === this.numberOne - this.numberTwo);
		solve(this.rightOrWrong);
	}
}

function division() {
	this.numberOne;
	this.numberTwo;
	this.generate = function () {
		this.numberOne = Math.floor(Math.random() * 9) + 1;
		this.numberTwo = Math.floor(Math.random() * 49) + 1;
	}
	this.verify = function (attempt, remainder) {
		this.rightOrWrong = (attempt === Math.floor(this.numberTwo / this.numberOne) &&
			remainder === this.numberTwo % this.numberOne);
		solve(this.rightOrWrong);
	}
}

function multiply() {
	this.numberOne;
	this.numberTwo;
	this.generate = function () {
		this.numberOne = Math.floor(Math.random() * 8) + 2;
		this.numberTwo = Math.floor(Math.random() * 8) + 2;
	}
	this.verify = function (attempt) {
		this.rightOrWrong = (attempt === this.numberOne * this.numberTwo);
		solve(this.rightOrWrong);
	}
}