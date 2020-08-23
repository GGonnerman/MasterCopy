function getFibonacci(count) {
	let a = b = c = 1;
	let result = [1, 1];
	count -= 2;
	if(count <= -2) return [];
	if(count == -1) return [1];
	if(count == 0) return [1, 1];	
	for(let i = 0; i < count; i++) {
		a += b;
		b = a - b;
		result.push(a);
	}

	return result;
}

console.log(getFibonacci(100));
