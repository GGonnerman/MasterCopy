var board = [["&nbsp;", "&nbsp;", "&nbsp;"], ["&nbsp;", "&nbsp;", "&nbsp;"], ["&nbsp;", "&nbsp;", "&nbsp;"]];
var turn = true;
var someoneWins = false;

function play(x, y) {
    x--;
    y--;
    //Check if the square has already been played
    if (board[x][y] !== "&nbsp;") {
        console.log("Already played here!");
    } else if (!someoneWins) {
        //Place either an X or O depending on which players turn it is
        turn ? board[x][y] = "X" : board[x][y] = "O";
        //Switch whos turn it is
        turn = !turn;
        updateGameBoard();
        checkWinners();
        checkCat();
    }
}

function checkCat() {
    //If noone has won yet
    if (!someoneWins) {
        var cat = true;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] === "&nbsp;") {
                    //If anyplaces havent been played put cat to false
                    cat = false;
                }
            }
        }
        if (cat) {
            //run the cat command after 1 second if its a cat game
            setTimeout("isCat()", 1000);
        }
    }
}

function isCat() {
    someoneWins = true;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            //clear the board
            board[i][j] = "&nbsp;";
        }
    }
    //make the board say cat
    board[1][0] = "C";
    board[1][1] = "a";
    board[1][2] = "t";
    for (var i = 0; i < 3; i++) {
        //make cat red
        document.getElementById("gameBoard").rows[1].cells[i].style.color = "#ff0000";
    }
    updateGameBoard();
}


function updateGameBoard() {
    //Make the visual gameboard equal the gameboard array
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            document.getElementById("gameBoard").rows[i].cells[j].innerHTML = board[i][j];
        }
    }
}

function checkWinners() {
    var ans = "X";
    for (var placeHolderValue = 0; placeHolderValue < 2; placeHolderValue++) {
        for (var i = 0; i < 3; i++) {
            //check rows for winner
            if (board[i][0] === ans && board[i][1] === ans && board[i][2] === ans) {
                for (var j = 0; j < 3; j++) {
                    document.getElementById("gameBoard").rows[i].cells[j].style.color = "#ff0000";
                }
                someoneWins = true;
                //check colomns for winner
            } else if (board[0][i] === ans && board[1][i] === ans && board[2][i] === ans) {
                for (var j = 0; j < 3; j++) {
                    document.getElementById("gameBoard").rows[j].cells[i].style.color = "#ff0000";
                }
                someoneWins = true;
            }
        }
        //check diagonal for winner
        if (board[0][0] === ans && board[1][1] === ans && board[2][2] === ans) {
            for (var j = 0; j < 3; j++) {
                document.getElementById("gameBoard").rows[j].cells[j].style.color = "#ff0000";
            }
            someoneWins = true;
        }
        if (board[0][2] === ans && board[1][1] === ans && board[2][0] === ans) {
            for (var j = 0; j < 3; j++) {
                document.getElementById("gameBoard").rows[j].cells[Math.abs(j - 2)].style.color = "#ff0000";
            }
            someoneWins = true;
        }
        ans = "O";
    }
}

function restartGame() {
    //Clear gameboard
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            board[i][j] = "&nbsp;";
            document.getElementById("gameBoard").rows[i].cells[j].innerHTML = board[i][j];
            document.getElementById("gameBoard").rows[i].cells[j].style.color = "#000";
        }
    }
    turn = true;
    someoneWins = false;
}
