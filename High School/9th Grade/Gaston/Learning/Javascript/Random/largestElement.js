function returnLargestElement(arr) {
	if(!arr) return null; // Return if empty
	return Math.max(...arr); // Math max takes a list of params, not an array tho
}
