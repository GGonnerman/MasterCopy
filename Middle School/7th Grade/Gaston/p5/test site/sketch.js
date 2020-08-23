let gameBoard;
let w;
let h;
let fr;
let current;
let highest;
let words;
let state;
let dotCount;
let buttons;
let paused;
let altstate;

function setup() {
	var canvas = createCanvas(240, 480);
	canvas.parent('sketch-holder');
	gameBoard = new board;
	w = canvas.width;
	h = canvas.height;
	fr = 2;
	dotCount = 0;
	paused = false;
	current = document.getElementById("current");
	highest = document.getElementById("highest");
	words = document.getElementById("running");
	buttons = document.getElementsByTagName("button");
	state = "Game has not started";
}

resetGame = function () {
	//Clean gameboard/start new game
	gameBoard = new board;
	gameBoard.startGame();
}

function draw() {
	//set game state to paragraph
	words.innerHTML = state;
	if (!paused) {
		frameRate(fr);
		background(151);
		strokeWeight(0.5);
		dotCount++;
		//Add/Delete dots for fun
		if (state !== "Game Over" && state !== "Game has not started") {
			if (dotCount % 3 === 0) {
				state = state + ".";
				if (state.length > 10) {
					state = state.slice(0, -3)
				}
			}
		}
		//Update gameboard
		if (gameBoard.hasGameRunning) {
			try {
				gameBoard.update();
			} catch (e) {
				gameBoard.hasGameRunning = false;
				gameBoard.gameOver = true;
				state = "Game Over";
			}
			try {
				gameBoard.show();
			} catch (e) {
				gameBoard.hasGameRunning = false;
				gameBoard.gameOver = true;
				state = "Game Over";
			}
			//Update highest score
			if (localStorage.getItem("highestScore") === null || localStorage.getItem("highestScore") < gameBoard.pieces.length) {
				localStorage.setItem("highestScore", gameBoard.pieces.length);
			}
		}
		//Set current/highest scores
		if (current.innerHTML !== "Current Score - " + gameBoard.pieces.length || highest.innerHTML !== "Highest Score - " + localStorage.getItem("highestScore")) {
			current.innerHTML = "Current Score - " + gameBoard.pieces.length;
			highest.innerHTML = "Highest Score - " + localStorage.getItem("highestScore");
		}
	}
}

function keyPressed() {
	if (keyCode === 27) {
		paused = !paused;
		if(paused) {
			altstate = state;
			state = "paused";
		} else {
			state = altstate;
		}
	}
	if (!paused) {
		//Make shape move left/right/flip
		if (keyCode === RIGHT_ARROW) {
			gameBoard.pieces[0].shapeMoved = 1;
		} else if (keyCode === LEFT_ARROW) {
			gameBoard.pieces[0].shapeMoved = -1;
		} else if (keyCode === DOWN_ARROW) {
			fr = 16;
		} else if (keyCode === UP_ARROW) {
			gameBoard.pieces[0].needsFlip = true;
		} else if (keyCode === 32) {
			//Space to reset game
			resetGame();
		}
	}
}

function keyReleased() {
	//When space isnt down reset framerate
	if (keyCode === DOWN_ARROW) {
		fr = 2;
	}
}