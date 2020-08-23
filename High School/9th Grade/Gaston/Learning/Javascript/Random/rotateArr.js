function rotateArr(arr, rotateAmt) {
	for(let i = 0; i < rotateAmt; i++) {
		arr.push(arr.shift());
	}
	return arr;
}

console.log(rotateArr([1, 2, 3], 1));
