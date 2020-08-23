Array.prototype.myCustomFeature = 'cool!';

let arr = ["John", "Jane", "Jim"];

for (let prop in arr) { // Don't Use For In With Arrays
	console.log(prop + ": " + arr[prop]);
}

console.log("-----------------------------");

for (let i = 0; i < arr.length; i++) {
	console.log(i + ": " + arr[i]);
}
