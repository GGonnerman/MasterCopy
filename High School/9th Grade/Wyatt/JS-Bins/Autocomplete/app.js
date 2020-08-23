var possible = [];
function autocomplete(input) {
    var iLength = input.length;
    var hasCompletion = false;
    var output = [];
    for (var i = 0; i < possible.length; i++) {
        var possibleString = possible[i];
        var splitPossible = possibleString.substring(0, iLength);
      if (input === splitPossible) {
            hasCompletion = true;
            output.push(possible[i]);
        }
    }
    if (!hasCompletion) {
        output.push("No autocorrect available")
    }
  possible = possible.sort();
    document.getElementById("output").innerHTML = output.join(", ");
}
function setWord(input){
  possible.push(input);
}
