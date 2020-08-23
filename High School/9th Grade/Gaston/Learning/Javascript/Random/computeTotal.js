function computeTotal(arr) { // Using for loop
	let sum = 0;
	for(let i = 0; i < arr.length; i++) {
		sum += arr[i];
	}
	return sum;
}

function computeTotal2(arr) { // Using while loop
	let i = 0;
	let sum = 0;
	while(i < arr.length) {
		sum += arr[i];
		i++;
	}
	return sum;
}

function computeTotal3(arr) { // Using recursion
	if(arr.length > 1) {
		return arr.shift() + computeTotal3(arr);
	} else {
		return arr[0];
	}
}

function computeTotal4(arr) { // Using es6
	return arr.reduce((t, p) => t += p);
}
