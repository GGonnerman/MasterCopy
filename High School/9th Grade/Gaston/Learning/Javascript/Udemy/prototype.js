String.prototype.reverse = function() {
	let result = "";
	for(let i = this.length - 1; i >= 0; i--) {
		result += this[i];
	}
	return result;
}

console.log("Hello".reverse());

String.prototype.isLengthGreaterThan = function(limit) {
	return this.length > limit;
}

console.log("John".isLengthGreaterThan(4));

Number.prototype.isPositive = function() {
	return this > 0;
}
let a = -3;
console.log(a.isPositive()); // Okay because 'a' was stored in variable
//console.log(3.isPositive()); // Causes error, numbers arent automically boxed
console.log(new Number(3).isPositive()); // Okay, becaused used new keywork
