function intersort(arr1, arr2) {
	let returnArr = arr1.concat(arr2);

	returnArr = returnArr.sort((elm1, elm2) => {
			return elm1 > elm2;
	});

	return returnArr;
}

console.log(intersort([1, 4, 6], [2,3,5]));
