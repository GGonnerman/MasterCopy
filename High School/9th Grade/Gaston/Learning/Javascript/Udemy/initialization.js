// Initialization

let people = [ // Dont be intiminated by large initializations of arrays/objects
	{
		// the "john" object 
		firstname: "John",
		lastname: "Doe",
		addresses: [
			"111 Main St.",
			"222 Third St."
		]
	},
	{
		// the "jane" object
		firstname: "Jane",
		lastname: "Doe",
		addresses: [
			"333 Main St.",
			"444 Fifth St."
		],
		greet() {
			return "Hello!";
		}
	}
]

console.log(people[1].greet());


