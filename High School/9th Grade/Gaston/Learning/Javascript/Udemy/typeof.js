let a = 3;
console.log(typeof a); // number

let b = "Hello";
console.log(typeof b); // string

let c = {};
console.log(typeof c); // object

let d = [];
console.log(typeof d); // object - weird!
console.log(Object.prototype.toString.call(d)); // [object Array] - better!

function Person(name) {
	this.name = name;
}

let e = new Person("Jane");
console.log(typeof e); // object
console.log(e instanceof Person); // true

console.log(typeof undefined); // undefinded - makes sense
console.log(typeof null); // object - a bug since like forever 

let z = function() { };
console.log(typeof z); // function
