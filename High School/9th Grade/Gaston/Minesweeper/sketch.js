let gameBoard = [
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0]
];

let gameover = false;

let ended = function () {
	console.log("Game is over!");
	for(let i = 0; i < gameBoard.length; i++) {
		for(let j = 0; j < gameBoard[i].length; j++) {
			if(gameBoard[i][j].value === 'Bomb') {
				gameBoard[i][j].shown = true;
			}
		}
	}
	gameover = true;
}

gamePiece = function (x, y) {
	this.x = x;
	this.y = y;
	this.shown = false;
	this.value = 0;
	this.neighborCount = 0;
	this.startup = function () {
		count(this.x, this.y, this.x - 1, this.y - 1);
		count(this.x, this.y, this.x - 1, this.y);
		count(this.x, this.y, this.x - 1, this.y + 1);
		count(this.x, this.y, this.x, this.y + 1);
		count(this.x, this.y, this.x + 1, this.y + 1);
		count(this.x, this.y, this.x + 1, this.y);
		count(this.x, this.y, this.x + 1, this.y - 1);
		count(this.x, this.y, this.x, this.y - 1);
		if (this.value !== 'Bomb') {
			this.value = this.neighborCount;
		}
	}
	this.click = function () {
		if (this.shown === true) {
			return;
		}
		this.shown = true;
		if (this.value === 0) {
			check(this.x - 1, this.y - 1);
			check(this.x - 1, this.y);
			check(this.x - 1, this.y + 1);
			check(this.x, this.y + 1);
			check(this.x + 1, this.y + 1);
			check(this.x + 1, this.y);
			check(this.x + 1, this.y - 1);
			check(this.x, this.y - 1);
		} else if (this.value === 'Bomb') {
			ended();
		}
	}
}

let click = function (characterValue, y) {
	if (!gameover) {
		let x = characterValue;
		if (isNaN(characterValue)) {
			x = (characterValue === characterValue.toUpperCase()) ? characterValue.charCodeAt(0) - 65 : characterValue.charCodeAt(0) - 97;
		}
		gameBoard[x][y-1].click();
		checkForWin();
		gameShow();
	}
}

let start = function (mineCount) {
	gameover = false;
	// Make each gameboard square a gamepiece object
	for (let i = 0; i < gameBoard.length; i++) {
		for (let j = 0; j < gameBoard[i].length; j++) {
			gameBoard[i][j] = new gamePiece(i, j);
		}
	}
	for (let i = 0; i < mineCount; i++) {
		let randomX = Math.floor(Math.random() * (4) + 1);
		let randomY = Math.floor(Math.random() * (4) + 1);

		if (gameBoard[randomX][randomY].value !== "Bomb") {
			gameBoard[randomX][randomY].value = "Bomb";
		} else {
			i--;
		}
	}
	for (let i = 0; i < gameBoard.length; i++) {
		for (let j = 0; j < gameBoard[i].length; j++) {
			gameBoard[i][j].startup();
		}
	}
	console.log("Game has started!");
	gameShow();
}

let count = function (orgX, orgY, x, y) {
	try {
		if (gameBoard[x][y].value === 'Bomb') {
			gameBoard[orgX][orgY].neighborCount++;
		}
	} catch (err) {

	}
}

let check = function (x, y) {
	try {
		if (gameBoard[x][y].shown === false) {
			gameBoard[x][y].click();
		}
	} catch (e) {
		return true;
	}
}

let gameShow = function () {
	let codes = ['A', 'B', 'C', 'D', 'E'];
	console.log("0, 1, 2, 3, 4, 5");
	for (let i = 0; i < gameBoard.length; i++) {
		let lineValue = "";
		lineValue += codes[i];
		for (let j = 0; j < gameBoard[i].length; j++) {
			if (gameBoard[i][j].shown === false) {
				lineValue += " X";
			} else {
				lineValue += " " + gameBoard[i][j].value;
			}
		}
		console.log(lineValue);
	}
}

let checkForWin = function () {
	if(gameBoard.some(function (row) {
		return row.some(function (block) {
			return (this.shown === false && this.value !== 'Bomb');
		});
	})) {
		console.log("You won!");
		gameover = true;
	}
}

let show = function () {
	let codes = ['A', 'B', 'C', 'D', 'E'];
	console.log("0, 1, 2, 3, 4, 5");
	for (let i = 0; i < gameBoard.length; i++) {
		let lineValue = "";
		lineValue += codes[i];
		for (let j = 0; j < gameBoard[i].length; j++) {
			if (gameBoard[i][j] !== 'Bomb') {
				lineValue += gameBoard[i][j].value;
			} else {
				lineValue += 'Bomb'
			}
		}
		console.log(lineValue);
	}
}

/*
let gameBoard = [
	[[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1]],
	[["A", 1], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[["B", 1], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[["C", 1], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[["D", 1], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[["E", 1], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
];

let neighbors = 0;
let emptyNeighbors = [];

let gamePiece = function(x, y) {
	this.x = x;
	this.y = y;
	this.shown = false;
	this.value = 0;
	this.neighborList = [];
	this.clicked = function() {
		this.shown = true;
		if(this.value === 0) {
			
		}
		console.log("it worked");
	}
}


let start = function (mineCount) {
	for (let i = 1; i < gameBoard.length; i++) {
		for (let j = 1; j < gameBoard[i].length; j++) {
			gameBoard[i][j] = new gamePiece(i, j);
		}
	}
	if (mineCount > gameBoard.length * gameBoard[0].length - 1) {
		//console.log(`minecount was ${mineCount}`);
		mineCount = gameBoard.length * gameBoard[0].length - 1;
		//console.log(`minecount is now ${mineCount}`);
	}
	for (let i = 0; i < mineCount; i++) {
		let x = Math.floor(Math.random() * (5));
		let y = Math.floor(Math.random() * (5)) + 1;
		if (gameBoard[x][y].value === 0) {
			gameBoard[x][y].value = "Bomb";
		} else {
			i--;
		}
		//console.log(`X value: ${x}\nY value: ${y}`);
	}
	for (let i = 1; i < gameBoard.length; i++) {
		for (let j = 1; j < gameBoard[i].length; j++) {
			gameBoard[i][j].neighbors = [];
			check(i, j);
		}
	}
}

let show = function () {
	console.log(gameBoard);
}

let gameShow = function () {
	for (let i = 0; i < gameBoard.length; i++) {
		let lineValue = "";
		for (let j = 0; j < gameBoard[i].length; j++) {
			if (gameBoard[i][j][1] === 0) {
				lineValue += " X";
			} else {
				lineValue += " " + gameBoard[i][j][0];
			}
		}
		console.log(lineValue);
	}
}

let check = function (x, y) {
	if (gameBoard[x][y] !== "Bomb") {
		let invCheck = function (x, y) {
			try {
				if (gameBoard[x][y].value === "Bomb") {
					neighbors++;
				} else if ((x > 0 && x < gameBoard.length) && (y > 0 && y < gameBoard[x].length)) {
					emptyNeighbors.push(x);
					emptyNeighbors.push(y);
				} else {
					//console.log(`X is ${x}\nY is ${y}`);
				}
			} catch (e) {}
		}
		invCheck(x - 1, y - 1);
		invCheck(x - 1, y);
		invCheck(x - 1, y + 1);
		invCheck(x, y + 1);
		invCheck(x + 1, y + 1);
		invCheck(x + 1, y);
		invCheck(x + 1, y - 1);
		invCheck(x, y - 1);
		//console.log(`Count is now ${neighbors}`);
		gameBoard[x][y][0] = neighbors;
	}
}

let click = function (characterValue, y) {
	let x = characterValue;
	console.log(`Character Value is ${characterValue}`);
	if (isNaN(characterValue)) {
		x = (characterValue === characterValue.toUpperCase()) ? characterValue.charCodeAt(0) - 64 : characterValue.charCodeAt(0) - 96;
	}
	//console.log(x);
	if (x > gameBoard.length - 1 || x < 1 || y > gameBoard[x].length || y < 1 || gameBoard[x][y][1] === 1) {
		console.log(`${characterValue}, ${y} is not on the gameboard`);
	} else {
		gameBoard[x][y][1] = 1;
		console.log(`Value of selected spot was ${gameBoard[x][y][0]}`);
		if (gameBoard[x][y][0] !== "Bomb") {
			console.log(`Was not a bomb`);
		} else {
			console.log(`Was a bomb`);
		}
		if (gameBoard[x][y][0] === 0) {
			emptyNeighbors = [];
			check(x, y);
			//console.log(`List of empty neighbors ${emptyNeighbors}`);
			for (let i = 0; i < emptyNeighbors.length; i += 2) {
				click(emptyNeighbors[i], emptyNeighbors[i + 1]);
			}
		}
	}
}
*/