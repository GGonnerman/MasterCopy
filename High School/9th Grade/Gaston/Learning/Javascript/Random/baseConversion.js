function b1Tob2(num, startingBase, targetBase) {
	let num1 = parseInt(num.join(""), 3);
	num1 = num1.toString(targetBase);
	return num1.split("");
}

console.log(b1Tob2([2, 1, 0], 3, 10));
