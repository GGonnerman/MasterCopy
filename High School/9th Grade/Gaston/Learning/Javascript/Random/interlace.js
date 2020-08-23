function interlace(arr1, arr2) {
	let returnArr = [];
	while(arr1.length > 0) {
		returnArr.push(arr1.shift());
		returnArr.push(arr2.shift());
	}
	return returnArr;
}

console.log(interlace(["a", "b", "c"],[1,2,3]));
