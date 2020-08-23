function mapForEach(arr, func) {
	let newArr = [];

	for (let i = 0; i < arr.length; i++) {
		newArr.push(
			func(arr[i])
		)
	}

	return newArr;

}

let checkPastLimit = function(limiter, item) {
	return item > limiter;
}

let check = function(limiter) {
	return function(limiter, item) {
		return item > limiter;
	}.bind(this, limiter);
}

let arr1 = [1, 2, 3];

let arr4 = mapForEach(arr1, check(1));

console.log(arr4);
