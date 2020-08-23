function shape() {
	this.color      = Math.floor(Math.random() * 6) + 1;
	this.blockType  = Math.floor(Math.random() * 7);
	this.shapeOver  = false;
	this.needsFlip  = false;
	this.blockList  = [];
	this.shapeMoved = 0;
	this.stage      = 0;

	//Create a shape based on the type (random number)
	if (this.blockType === 0) {
		this.blockList.push(new block(0, 4));
		this.blockList.push(new block(0, 6));
		this.blockList.push(new block(0, 5));
		this.blockList.push(new block(0, 7));
	} else if (this.blockType === 1) {
		this.blockList.push(new block(-1, 4));
		this.blockList.push(new block(0, 4));
		this.blockList.push(new block(0, 6));
		this.blockList.push(new block(0, 5));
	} else if (this.blockType === 2) {
		this.blockList.push(new block(-1, 6));
		this.blockList.push(new block(0, 6));
		this.blockList.push(new block(0, 4));
		this.blockList.push(new block(0, 5));
	} else if (this.blockType === 3) {
		this.blockList.push(new block(-1, 5));
		this.blockList.push(new block(-1, 6));
		this.blockList.push(new block(0, 5));
		this.blockList.push(new block(0, 6));
	} else if (this.blockType === 4) {
		this.blockList.push(new block(0, 5));
		this.blockList.push(new block(0, 6));
		this.blockList.push(new block(-1, 7));
		this.blockList.push(new block(-1, 6));
	} else if (this.blockType === 5) {
		this.blockList.push(new block(0, 7));
		this.blockList.push(new block(-1, 6));
		this.blockList.push(new block(0, 5));
		this.blockList.push(new block(0, 6));
	} else if (this.blockType === 6) {
		this.blockList.push(new block(0, 7));
		this.blockList.push(new block(-1, 5));
		this.blockList.push(new block(-1, 6));
		this.blockList.push(new block(0, 6));
	}

	//Set color of each block
	this.blockList.forEach(element => {
		element.color = this.color;
	});

	//Attempt to flip the shape
	this.flip = function () {
		//Check which type of block is being flipped
		if (this.blockType === 0) {
			//Check which stage of flipping the block is at
			if (this.stage === 0) {
				//Verify you can move to a position
				if (this.checkGameBoard([-1, 1, 1, -1]) &&
					(gameBoard.values[this.blockList[3].y + 2] !== undefined) &&
					(gameBoard.values[this.blockList[3].y + 2][this.blockList[3].x - 2] < 20)) {
						//Move to that place
					this.shift(["topmid", "bottommid"]);
					this.blockList[3].x -= 2;
					this.blockList[3].y += 2;
					this.stage++;
				}
			} else if (this.stage === 1) {
				if (this.checkGameBoard([1, 1, -1, -1]) &&
					(gameBoard.values[this.blockList[3].y - 2] !== undefined) &&
					(gameBoard.values[this.blockList[3].y - 2][this.blockList[3].x - 2] < 20)) {
					this.shift(["midright", "midleft"]);
					this.blockList[3].x -= 2;
					this.blockList[3].y -= 2;
					this.stage++;
				}
			} else if (this.stage === 2) {
				if (this.checkGameBoard([1, -1, -1, 1]) &&
					(gameBoard.values[this.blockList[3].y + 2] !== undefined) &&
					(gameBoard.values[this.blockList[3].y + 2][this.blockList[3].x + 2] < 20)) {
					this.shift(["bottommid", "topmid"]);
					this.blockList[3].x += 2;
					this.blockList[3].y += 2;
					this.stage++;
				}
			} else if (this.stage === 3) {
				if (this.checkGameBoard([-1, 1, 1, 1]) &&
					(gameBoard.values[this.blockList[3].y - 2] !== undefined) &&
					(gameBoard.values[this.blockList[3].y - 2][this.blockList[3].x + 2] < 20)) {
					this.shift(["midleft", "midright"]);
					this.blockList[3].x += 2;
					this.blockList[3].y -= 2;
					this.stage = 0;
				}
			}
		} else if (this.blockType === 1) {
			if (this.stage === 0) {
				if (this.checkGameBoard([0, 2, -1, 1, 1, -1])) {
					this.shift(["topright", "topmid", "bottommid"]);
					this.stage++;
				}
			} else if (this.stage === 1) {
				if (this.checkGameBoard([2, 0, 1, 1, -1, -1])) {
					this.shift(["bottomright", "midright", "midleft"]);
					this.stage++;
				}
			} else if (this.stage === 2) {
				if (this.checkGameBoard([0, -2, 1, -1, -1, 1])) {
					this.shift(["bottomleft", "bottommid", "topmid"]);
					this.stage++;
				}
			} else if (this.stage === 3) {
				if (this.checkGameBoard([-2, 0, -1, -1, 1, 1])) {
					this.shift(["topleft", "midleft", "midright"]);
					this.stage = 0;
				}
			}
		} else if (this.blockType === 2) {
			if (this.stage === 0) {
				if (this.checkGameBoard([2, 0, 1, -1, -1, 1])) {
					this.shift(["bottomright", "bottommid", "topmid"]);
					this.stage++;
				}
			} else if (this.stage === 1) {
				if (this.checkGameBoard([0, -2, -1, -1, 1, 1])) {
					this.shift(["bottomleft", "midleft", "midright"]);
					this.stage++;
				}
			} else if (this.stage === 2) {
				if (this.checkGameBoard([-2, 0, -1, 1, 1, -1])) {
					this.shift(["topleft", "topmid", "bottommid"]);
					this.stage++;
				}
			} else if (this.stage === 3) {
				if (this.checkGameBoard([0, 2, 1, 1, -1, -1])) {
					this.shift(["topright", "midright", "midleft"]);
					this.stage = 0;
				}
			}
		} else if (this.blockType === 3) {
		} else if (this.blockType === 4) {
			if (this.stage === 0) {
				if (this.checkGameBoard([-2, 0, -1, -1, 1, -1])) {
					this.shift(["topleft", "midleft", "bottommid"]);
					this.stage++;
				}
			} else if (this.stage === 1) {
				if (this.checkGameBoard([2, 0, 1, 1, -1, 1])) {
					this.shift(["bottomright", "midright", "topmid"]);
					this.stage = 0;
				}
			}
		} else if (this.blockType === 5) {
			if (this.stage === 0) {
				if (this.checkGameBoard([1, -1])) {
					this.shift(["bottommid", "midright", "topmid"]);
					this.stage++;
				}
			} else if (this.stage === 1) {
				if (this.checkGameBoard([-1, -1])) {
					this.shift(["midleft", "bottommid", "midright"]);
					this.stage++;
				}
			} else if (this.stage === 2) {
				if (this.checkGameBoard([-1, 1])) {
					this.shift(["topmid", "midleft", "bottommid"]);
					this.stage++;
				}
			} else if (this.stage === 3) {
				if (this.checkGameBoard([1, 1])) {
					this.shift(["midright", "topmid", "midleft"]);
					this.stage = 0;
				}
			}
		} else if (this.blockType === 6) {
			if (this.stage === 0) {
				if (this.checkGameBoard([1, -1, 0, 2, 1, 1])) {
					this.shift(["bottommid", "topright", "midright"]);
					this.stage++;
				}
			} else if (this.stage === 1) {
				if (this.checkGameBoard([-1, 1, 0, -2, -1, -1])) {
					this.shift(["topmid", "bottomleft", "midleft"]);
					this.stage = 0;
				}
			}
		}
	}

	//Check if you can move to a position
	this.checkGameBoard = function (params) {
		//List x and y values
		let ex      = [];
		let why     = [];
		let canMove = true;
		//Add items from params to x/y arrays
		for (let i = 0; i < params.length; i++) {
			if (i === 0 || i % 2 === 0) {
				why.push(params[i]);
			} else {
				ex.push(params[i]);
			}
		}
		//Check if any blocks will error after moving
		for (let i = 0; i < params.length / 2; i++) {
			if (gameBoard.values[this.blockList[i].y + why[i]] === undefined) {
				canMove = false
			} else if (gameBoard.values[this.blockList[i].y + why[i]][this.blockList[i].x + ex[i]] >= 20) {
				canMove = false;
			}
		}
		return canMove;
	}

	//Move blocks in specified direction
	this.shift = function (params) {
		for (let i = 0; i < params.length; i++) {
			//For each case move to that spot
			switch (params[i]) {
				case "topmid":
					this.blockList[i].x++;
					this.blockList[i].y--;
					break;
				case "topright":
					this.blockList[i].x += 2;
					break;
				case "midright":
					this.blockList[i].x++;
					this.blockList[i].y++;
					break;
				case "bottomright":
					this.blockList[i].y += 2;
					break;
				case "bottommid":
					this.blockList[i].x--;
					this.blockList[i].y++;
					break;
				case "bottomleft":
					this.blockList[i].x -= 2;
					break;
				case "midleft":
					this.blockList[i].x--;
					this.blockList[i].y--;
					break;
				case "topleft":
					this.blockList[i].y -= 2;
					break;
			}
		}
	}

	this.update = function () {
		//Empty the gameboard
		gameBoard.clean();
		//If flip is needed then flip
		if (this.needsFlip) {
			this.flip();
			this.needsFlip = false;
		}
		//Set each block to move correctly
		for (let i = this.blockList.length - 1; i >= 0; i--) {
			this.blockList[i].moved = this.shapeMoved;
		}
		//Create arrays for the amount of errors/warnings
		let errors = this.blockList.filter(block => (block.check() === 2));
		let warnings = this.blockList.filter(block => (block.check() === 1));
		//Pass the amount of errors to each block in update/show function
		for (let i = this.blockList.length - 1; i >= 0; i--) {
			if (errors.length > 0) {
				this.blockList[i].update(2);
				this.blockList[i].show();
				this.shapeOver = true;
			} else if (warnings.length > 0) {
				this.blockList[i].update(1);
				this.blockList[i].show();
			} else {
				this.blockList[i].update(0);
				this.blockList[i].show();
			}
		}
		//If shape is on ground, kill it
		this.shapeOver  = ((errors.length > 0) ? true : false);
		//Reset moving
		this.shapeMoved = 0;
	}
}