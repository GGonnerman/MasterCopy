let answer;
let previousGuesses;
let guessCount;
let gameOver;

const maxGuess = 10;

function setWord(word) {
if(/[^a-z]/gi.test(word)) {
    return;
}
    gameOver = false;
    previousGuesses = [];
    guessCount = 0;
    answer = word.toLowerCase();

    document.getElementById("ans").innerHTML = "";
    document.getElementById("letter").value = "";
    document.getElementById("word").value = "";

    displayState();
}

function guessLetter(letter) {
if(!gameOver) {
    letter = letter.toLowerCase();
    charCode = letter.charCodeAt(0);
    if(letter == "" || charCode < 97 || charCode > 122) {
        console.log("Please Enter A Character");
        return;
    }
    if(!previousGuesses.includes(letter) && answer.includes(letter)) {
        previousGuesses[previousGuesses.length] = letter;
        console.log("Guessing " + letter + "...");
        console.log(letter + " was in the word");
    } else if(previousGuesses.includes(letter)) {
        console.log("You have already guessed: " + letter);
    } else {
    guessCount++;
    previousGuesses[previousGuesses.length] = letter;
        console.log("Guessing " + letter + "...");
        console.log(letter + " was not in the word");
    }

     displayState();

    document.getElementById("letter").value = "";
    }
}

function checkForWin() {
if(guessCount >= maxGuess) {
gameOver = true;
 return "You lose, the word was \"" + answer + "\"";
 }
    gameOver = true;
    answer.split("").forEach(x => {
        if(!previousGuesses.includes(x)) {
            gameOver = false;
        }
    });
    return (gameOver ? "You Win!" : "");
}

function displayState() {
     document.getElementById("ans").innerHTML = (getWord() +
     "<br/>Guess Count: " + guessCount +
     "<br/>Guessed Letter: " + previousGuesses.join(", ") +
     "<br/>" + checkForWin());
}

function getWord() {
    return (answer.split("").map(x => previousGuesses.includes(x) ? x : "_").join(" "));
}

window.onload = function(){
document.getElementById("word")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if(event.keyCode === 13) {
        document.getElementById("setWordButton").click();
        }
    })

document.getElementById("letter")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if(event.keyCode === 13) {
        document.getElementById("guessButton").click();
        }
    })
}();