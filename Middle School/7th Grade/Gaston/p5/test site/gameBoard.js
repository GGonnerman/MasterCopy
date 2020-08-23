function board() {
	this.gameOver       = false;
	this.hasGameRunning = false;
	this.boxSize        = w / 10;
	this.pieces         = [];
	this.values         = [
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
		[20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
	]

	this.startGame = function() {
		//Begin the game by spawning a piece
		if (!this.hasGameRunning) {
			this.pieces[0]      = new shape();
			this.hasGameRunning = true;
			state               = "Running";
		}
	}

	this.addShapeIfNeeded = function() {
		if (this.gameOver === false) {
			//Add new shape
			if (this.pieces[0].shapeOver === true) {
				this.pieces.unshift(new shape());
			}
			this.pieces[0].update();
		}
	}

	this.removeFullLines = function() {
		for (let i = 0; i < this.values.length - 1; i++) {
			if (this.values[i].every(x => x >= 20)) {
				this.values.splice(i, 1);
				this.values.unshift([20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20]);
			}
		}
	}

	this.clean = function () {
		//Remove boxes from shapes that arent over
		for (let i = 0; i < this.values.length; i++) {
			this.values[i] = this.values[i].map(function (box) {
				return (box >= 10 && box < 20) ? 0 : box;
			});
		}
	}

	this.update = function () {
		this.addShapeIfNeeded();
		this.removeFullLines();
	}

	this.show = function () {
		//Draw and color all shapes
		this.values.forEach(function (row, rowIndex) {
			row.forEach(function (box, boxIndex) {
				if (box > 9) {
					let colorValue = box;
					while (colorValue > 10) {
						colorValue -= 10
					}
					if (colorValue === 1) {
						fill(255, 0, 0);
					} else if (colorValue === 2) {
						fill(255, 127, 0);
					} else if (colorValue === 3) {
						fill(255, 255, 0);
					} else if (colorValue === 4) {
						fill(0, 255, 0);
					} else if (colorValue === 5) {
						fill(0, 0, 255);
					} else if (colorValue === 6) {
						fill(75, 0, 130);
					} else if (colorValue === 7) {
						fill(148, 0, 211);
					}
					rect(w / 10 * boxIndex - gameBoard.boxSize, h / 20 * rowIndex, gameBoard.boxSize, gameBoard.boxSize);
				}
			})
		})
	}
}