function p(str) {
        console.log(str, arr);
        arr = ["Element 1", "Element 2", "Element 3"];
}
function n(str) {
        console.log(str, numArr);
        numArr = [3, 7, 2, 89, 345, 4, 1];
}
let numArr = [3, 7, 2, 89, 345, 4, 1];

/*
 * Content Here Was Helped By
 * https://www.w3schools.com/jsref/jsref_obj_array.asp
 * Thank You
 */

let arr = ["List", "Of", "Value"]; // Creating new array
p("Created An Array");

let x = arr[1]; // Get an element from the array
console.log("X: \"" +  x + "\"");

arr[1] = "Crazy Magic"; // Set a value in an array
p("Did some crazy magic");

arr.push("New Last Value"); // Adding element to the end of an array
p("Pushed Value To Array");

arr.pop(); // Removing last element of an array
p("Popped Array"); 

arr.unshift("New First Element"); // Adding element to start of an array
p("Unshifted Value To Array");

arr.shift(); // Removing first element of array
p("Shifted Array");

arr = arr.join(" and "); // Joined with given seperator
p(`Joined With " and ": `);

arr.reverse(); // Reverses an array
p("Reversed Array");

let includes = arr.includes("Element 1"); // Returns weather any element in the array is a specific value
let otherIncludes = arr.includes("1");
console.log(`Array Contains "Element 1":`, includes);
console.log(`Array Contains "1":`, otherIncludes);

for(let i = 0; i < arr.length; i++) { // Basic Function Looping
        console.log("Looping Through " + arr[i]);
}
arr.forEach(function(currentValue, index, array) { // Advanced Function Looping
        console.log("Current Value: " + currentValue + "\nIndex: " + index + "\nArray: " + array);
});

arr.forEach(currentValue => { // Advanced Function Looping With Arrow Notation
        console.log("Fast " + currentValue)
});

let passesTest = arr.every(x => x.includes("Element")); // Returns weather all elements in an array pass a test
let hasOnes = arr.every(x => x.includes("1"));
console.log(`All Elements Contain "Element":`, passesTest);
console.log(`All Elements Have "1":`, hasOnes);

let partial = arr.some(x => x.includes("1")); // Return weather any elements in an array pass a test
let otherPartial = arr.some(x => x.includes("XYZ"));
console.log(`Some Elements Contain "1":`, partial);
console.log(`Some Elements Contain "XYZ":`, otherPartial);

arr = arr.map(x => { // Created a new array with some action done to all elements of another array
return x.split("").reverse().join(""); // Return what you want to have in new array
});
p("Reverse Each Element");

console.log("Number Array", numArr);

numArr = numArr.filter(x => { // Created new array with values from old array that pass a test/return true
        if(x < 10) {
                return true;
        }
});
n("Filtered To Numbers Under 10");

numArr = numArr.reduce((total, part) => { // Reduces an array to a single value
        return total + part;
});
n("Reduced Array");
