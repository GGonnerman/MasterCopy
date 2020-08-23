function numDigits(num) {
	return num
			.toString()
			.split("")
			.map(x => parseInt(x));
}

console.log(numDigits(1234));
