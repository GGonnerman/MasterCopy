function block(startingY, startingX) {
	this.y     = arguments[0];
	this.x     = arguments[1];
	this.moved = 0;
	this.over  = false;

	this.check = function () {
		//Check next box and return if that is open
		if (typeof gameBoard.values[this.y + 1] === "undefined") {
			return 0;
		} else if (gameBoard.values[this.y + 1][this.x] >= 20) {
			return 2;
		} else if (gameBoard.values[this.y + 1][this.x + this.moved] >= 20) {
			return 1;
		} else {
			return 0;
		}
	}

	this.update = function (warninz) {
		if (arguments[0] === 2) { 
			//2 warning means the shape is over
			this.over = true;
		} else if (arguments[0] === 1) { 
			//One warning means you can only move down, not sideways
			this.y++;
		} else if (arguments[0] === 0) { 
			//No warnings, move anywhere
			this.y++;
			this.x += this.moved;
		}
	}

	//Display block or finished block value
	this.show = function () {
		if (this.over) {
			gameBoard.values[this.y][this.x] = 20 + this.color;
		} else if (gameBoard.values[this.y] !== undefined) {
			gameBoard.values[this.y][this.x] = 10 + this.color;
		}
	}
}