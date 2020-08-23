// function statement
function greet(name) {
	console.log("Hello " + name);
}

greet("John");

// function expression 
var greetFunc = function(name) {
	console.log("Hello " + name);
};

greetFunc("John");

// Using an Immidiately Invoaked Function Expression (IIFE) 
let greeting = function(name) {
	return "Hello " + name;
}("John");

console.log(greeting);


let firstname = "John";

(function(name) {
	let greeting = "Inside IIFE: Hello";
	console.log(greeting + " " + name);
}(firstname)); // IIFE
